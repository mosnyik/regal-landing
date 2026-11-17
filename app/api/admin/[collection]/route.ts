import type { NextRequest } from "next/server";
import { type Collection, readAll, remove } from "@/lib/store";
import { isAdmin, unsubscribeUrl } from "@/lib/tokens";

/**
 * Admin-only API (requires `Authorization: Bearer $ADMIN_TOKEN`).
 *
 *   GET    /api/admin/waitlist            → JSON list
 *   GET    /api/admin/waitlist?format=csv → CSV export (includes unsubscribe links)
 *   DELETE /api/admin/waitlist?email=x    → delete an entry on request
 *
 * Collections: inquiries | enrollments | waitlist
 */

const COLLECTIONS: Collection[] = ["inquiries", "enrollments", "waitlist"];

function parse(c: string): Collection | null {
  return (COLLECTIONS as string[]).includes(c) ? (c as Collection) : null;
}

function toCsv(rows: Record<string, unknown>[]) {
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const esc = (v: unknown) => {
    let s = v === undefined || v === null ? "" : String(v);
    // Neutralize spreadsheet formula injection.
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\r\n");
}

export async function GET(req: NextRequest, ctx: RouteContext<"/api/admin/[collection]">) {
  if (!isAdmin(req.headers.get("authorization"))) {
    return new Response("Unauthorized", { status: 401 });
  }
  const c = parse((await ctx.params).collection);
  if (!c) return new Response("Not found", { status: 404 });

  let rows: Record<string, unknown>[] = await readAll(c);
  if (c === "waitlist") {
    rows = rows.map((r) => ({ ...r, unsubscribeUrl: unsubscribeUrl(String(r.email)) }));
  }

  if (req.nextUrl.searchParams.get("format") === "csv") {
    return new Response(toCsv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${c}-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }
  return Response.json(rows, { headers: { "Cache-Control": "no-store" } });
}

export async function DELETE(req: NextRequest, ctx: RouteContext<"/api/admin/[collection]">) {
  if (!isAdmin(req.headers.get("authorization"))) {
    return new Response("Unauthorized", { status: 401 });
  }
  const c = parse((await ctx.params).collection);
  if (!c) return new Response("Not found", { status: 404 });

  const email = req.nextUrl.searchParams.get("email")?.toLowerCase();
  const id = req.nextUrl.searchParams.get("id");
  if (!email && !id) return new Response("Provide ?email= or ?id=", { status: 400 });

  const removed = await remove(
    c,
    (r) => (id ? r.id === id : String(r.email).toLowerCase() === email),
  );
  return Response.json({ removed });
}
