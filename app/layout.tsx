import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import { enrolmentStatus, site, webinars } from "@/content/site";
import { EnrolLink, EnrolProvider } from "@/components/Enroll";
import { Header } from "@/components/Header";
import { WebinarBar } from "@/components/Webinar";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });

const title = "Regal Cyber Academy | Become Work-Ready in Governance, Risk and Compliance";
const description =
  "A 12-week, live instructor-led GRC programme with hands-on labs, real-world examples and a capstone project you can show employers. No GRC background needed.";

export const metadata: Metadata = {
  // Absolute base for share links and preview images. Set SITE_URL to the live domain.
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  alternates: { canonical: "/" },
  // Link previews on WhatsApp, Facebook, LinkedIn, Instagram DMs, iMessage, Slack…
  // (the image comes from app/opengraph-image.jpg)
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_US",
  },
  // X / Twitter large preview card (image from app/twitter-image.jpg)
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const showWebinars = webinars.enabled && webinars.items.length > 0;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#top">
          Skip to content
        </a>
        <EnrolProvider status={enrolmentStatus}>
          {showWebinars && <WebinarBar items={webinars.items} />}
          <Header showWebinars={showWebinars} />
          {children}
          <Footer />
        </EnrolProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image src="/brand/logo-on-dark.png" alt="Regal Cyber Academy" width={1128} height={254} />
          <p>{site.description}</p>
        </div>
        <nav aria-label="Quick links">
          <h2>Quick links</h2>
          <ul>
            <li><Link href="/#top">Home</Link></li>
            <li><Link href="/#who">Who It&apos;s For</Link></li>
            <li><Link href="/#programmes">Programmes</Link></li>
            {showWebinars && <li><Link href="/#webinars">Events &amp; Webinars</Link></li>}
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/#enroll">Upcoming Cohorts</Link></li>
            <li><Link href="/#testimonials">Testimonials</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
            <li><EnrolLink className="linklike footer-enrol" /></li>
          </ul>
        </nav>
        <div>
          <h2>Contact</h2>
          <a className="footer-mail" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
        </div>
        <nav aria-label="Legal">
          <h2>Legal</h2>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms and Conditions</Link></li>
            <li><Link href="/terms#refunds">Refund Policy</Link></li>
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
