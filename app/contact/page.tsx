import type { Metadata } from "next";
import { Contact, PageHeader } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Contact Us | Regal Cyber Academy",
  description: "Ask Regal Cyber Academy about the GRC programme, the next cohort or whether it's right for you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="top">
      <PageHeader eyebrow="Get in touch" title="Contact Us">
        Ask about the programme, the next cohort or whether it&apos;s right for you. Send us a message and we&apos;ll
        reply by email.
      </PageHeader>
      <Contact />
    </main>
  );
}
