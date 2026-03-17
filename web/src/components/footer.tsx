import Link from "next/link";
import { siteConfig } from "@/content/site.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-white/70 py-6 text-sm text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">
            {siteConfig.firm.name}
          </p>
          <p>{siteConfig.contact.address}</p>
          <p>{siteConfig.contact.phone}</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <nav className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-accent">
              About
            </Link>
            <Link href="/services" className="hover:text-accent">
              Services
            </Link>
            <Link href="/testimonials" className="hover:text-accent">
              Testimonials
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </nav>
          <p className="text-xs text-slate-500">
            © {year} {siteConfig.firm.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

