import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Minimal storage layer. Submissions are written as JSON files in DATA_DIR
 * (default ./.data, git-ignored), which is never served publicly and is only
 * readable through the token-protected admin endpoints.
 *
 * This works on a VPS / long-running Node server. On serverless hosts with a
 * read-only filesystem (e.g. Vercel), replace these functions with a database
 * (Postgres, Supabase, Firestore…) — the rest of the app only uses this API.
 */

export type Collection = "inquiries" | "enrollments" | "waitlist";

export type StoredRecord = {
  id: string;
  createdAt: string;
  [key: string]: string | boolean | undefined;
};

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");

function fileFor(c: Collection) {
  return path.join(DATA_DIR, `${c}.json`);
}

// Serialize writes per collection so concurrent submissions don't clobber each other.
const locks = new Map<Collection, Promise<unknown>>();
function withLock<T>(c: Collection, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(c) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(c, next.catch(() => {}));
  return next;
}

export async function readAll(c: Collection): Promise<StoredRecord[]> {
  try {
    const raw = await fs.readFile(fileFor(c), "utf8");
    return JSON.parse(raw) as StoredRecord[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(c: Collection, records: StoredRecord[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${fileFor(c)}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), { mode: 0o600 });
  await fs.rename(tmp, fileFor(c));
}

export function insert(
  c: Collection,
  data: Record<string, string | boolean | undefined>,
): Promise<StoredRecord> {
  return withLock(c, async () => {
    const records = await readAll(c);
    const record: StoredRecord = { id: randomUUID(), createdAt: new Date().toISOString(), ...data };
    records.push(record);
    await writeAll(c, records);
    return record;
  });
}

/** Insert unless a record with the same email exists. Returns null on duplicate. */
export function insertUniqueEmail(
  c: Collection,
  data: Record<string, string | boolean | undefined> & { email: string },
): Promise<StoredRecord | null> {
  return withLock(c, async () => {
    const records = await readAll(c);
    const email = data.email.toLowerCase();
    if (records.some((r) => String(r.email).toLowerCase() === email)) return null;
    const record: StoredRecord = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
      email,
    };
    records.push(record);
    await writeAll(c, records);
    return record;
  });
}

export function update(
  c: Collection,
  match: (r: StoredRecord) => boolean,
  patch: Record<string, string | boolean | undefined>,
): Promise<number> {
  return withLock(c, async () => {
    const records = await readAll(c);
    let n = 0;
    for (const r of records) {
      if (match(r)) {
        Object.assign(r, patch);
        n++;
      }
    }
    if (n) await writeAll(c, records);
    return n;
  });
}

export function remove(c: Collection, match: (r: StoredRecord) => boolean): Promise<number> {
  return withLock(c, async () => {
    const records = await readAll(c);
    const kept = records.filter((r) => !match(r));
    const n = records.length - kept.length;
    if (n) await writeAll(c, kept);
    return n;
  });
}
