import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Testimonials
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          A sample of the kind of feedback clients share about working with
          Liquid Financial.
        </p>
      </div>
      <TestimonialsCarousel />
    </div>
  );
}

