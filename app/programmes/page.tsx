import type { Metadata } from "next";
import { ActionBar, Cohort, Curriculum, Instructor, WhoItsFor } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Programmes | Regal Cyber Academy",
  description:
    "What you will learn on the Regal Cyber Academy GRC programme, who it is for, your lead instructor and the next cohort.",
  alternates: { canonical: "/programmes" },
};

export default function ProgrammesPage() {
  return (
    <main id="top">
      <Curriculum as="h1" />
      <WhoItsFor />
      <Instructor />
      <Cohort />
      <ActionBar />
    </main>
  );
}
