import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site.config";

export function Hero() {
  const { firm, principal } = siteConfig;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-slate-50 py-16 dark:from-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-6 text-center lg:text-left">
          <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            Calm, precise accounting in the GTA
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
            {firm.name}
          </h1>
          {firm.tagline ? (
            <p className="text-balance text-base text-slate-600 dark:text-slate-300">
              {firm.tagline}
            </p>
          ) : null}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Work directly with {principal.name}, {principal.title}, for tax,
            accounting, and advisory support for individuals and small
            businesses across the Greater Toronto Area.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-start sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90"
            >
              Get in touch
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-100"
            >
              Client login
            </Link>
          </div>
        </div>
        <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:max-w-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
              <Image
                src={principal.headshotPath}
                alt={principal.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {principal.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {principal.title}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            One point of contact, clear timelines, and practical guidance before
            and after filing deadlines.
          </p>
        </div>
      </div>
    </section>
  );
}

