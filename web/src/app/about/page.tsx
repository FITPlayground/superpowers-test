import Image from "next/image";
import { siteConfig } from "@/content/site.config";

export default function AboutPage() {
  const { principal } = siteConfig;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            About {principal.name}
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {principal.title}
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {principal.bio}
          </p>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              Clients work directly with {principal.name} from first
              conversation through to filing and follow-up. The focus is on
              clear explanations, realistic timelines, and practical next
              steps—without unnecessary complexity.
            </p>
            <p>
              Liquid Financial is intentionally small so that questions are
              answered by someone who knows your file, your history, and your
              goals.
            </p>
          </div>
        </div>
        <aside className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
            <Image
              src={principal.headshotPath}
              alt={principal.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {principal.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {principal.title}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

