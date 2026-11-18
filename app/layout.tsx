import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Anton, Archivo } from "next/font/google";
import { enrolmentStatus, site } from "@/content/site";
import { EnrolLink, EnrolProvider } from "@/components/Enroll";
import { Header } from "@/components/Header";
import "./globals.css";

const display = Anton({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const body = Archivo({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const title = "Regal Cyber Academy | Governance, Risk and Compliance (GRC) Academy";
const description =
  "Build practical GRC skills and become industry-ready. Live instructor-led sessions, hands-on labs, real-world examples and practical projects.";

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

export const viewport: Viewport = { themeColor: "#028090" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#top">
          Skip to content
        </a>
        <EnrolProvider status={enrolmentStatus}>
          <Header />
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
          <p>
            Practical Governance, Risk and Compliance training through live instructor-led sessions, hands-on
            labs and real-world projects.
          </p>
        </div>
        <nav aria-label="Quick links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link href="/#top">Home</Link></li>
            <li><Link href="/#about">About Us</Link></li>
            <li><Link href="/#programs">Programs</Link></li>
            <li><Link href="/#events">Events</Link></li>
            <li><Link href="/#testimonials">Testimonials</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
            <li><EnrolLink /></li>
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
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
