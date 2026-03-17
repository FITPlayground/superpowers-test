"use client";

import * as React from "react";
import { siteConfig } from "@/content/site.config";

export function TestimonialsCarousel() {
  const { testimonials } = siteConfig;
  const [index, setIndex] = React.useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  function next() {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <div className="relative flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        Client feedback
      </p>
      <p className="text-base leading-relaxed text-slate-800 dark:text-slate-100">
        “{current.quote}”
      </p>
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-200">
            {current.authorName}
          </p>
          <p>{current.authorTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <span className="tabular-nums">
            {index + 1}/{testimonials.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

