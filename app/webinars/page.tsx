import type { Metadata } from "next";
import { PageHeader } from "@/components/Sections";
import { WebinarCard } from "@/components/Webinar";
import { webinars } from "@/content/site";

export const metadata: Metadata = {
  title: "Events & Webinars | Regal Cyber Academy",
  description: "Free live webinars and events from Regal Cyber Academy on building a career in GRC.",
  alternates: { canonical: "/webinars" },
};

const empty = <p className="muted">There are no upcoming events right now. Check back soon.</p>;

export default function WebinarsPage() {
  const items = webinars.enabled ? webinars.items : [];
  return (
    <main id="top">
      <PageHeader eyebrow="Events & Webinars" title="Upcoming Events">
        Free live sessions on breaking into Governance, Risk and Compliance.
      </PageHeader>
      <section className="section events" aria-label="Upcoming events">
        <div className="wrap">{items.length > 0 ? <WebinarCard items={items} empty={empty} /> : empty}</div>
      </section>
    </main>
  );
}
