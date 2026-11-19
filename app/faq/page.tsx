import type { Metadata } from "next";
import { Faq } from "@/components/Sections";

export const metadata: Metadata = {
  title: "FAQ | Regal Cyber Academy",
  description: "Answers to common questions about the Regal Cyber Academy GRC programme and enrollment.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main id="top">
      <Faq as="h1" />
    </main>
  );
}
