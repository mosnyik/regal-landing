"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EnrolButton } from "./Enroll";

const NAV = [
  { href: "/#top", label: "Home" },
  { href: "/#programmes", label: "Programmes" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact Us" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/#top" className="logo" aria-label="Regal Cyber Academy — home" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-on-dark.png" alt="Regal Cyber Academy" width={1128} height={254} priority />
        </Link>

        <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="nav-cta" onClick={() => setOpen(false)}>
              <EnrolButton className="btn btn-sm" />
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={`menu-btn${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
