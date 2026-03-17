import Link from "next/link";
import { siteConfig } from "@/content/site.config";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
            LF
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {siteConfig.firm.name}
            </span>
            {siteConfig.firm.tagline ? (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {siteConfig.firm.tagline}
              </span>
            ) : null}
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
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
          <Link
            href="/login"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-accent/90"
          >
            Client login
          </Link>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

