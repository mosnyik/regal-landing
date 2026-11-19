import { ActionBar, Approach, Cohort, Hero, Roles, Testimonials } from "@/components/Sections";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Roles />
      <Approach />
      <Testimonials />
      <Cohort />
      <ActionBar />
    </main>
  );
}
