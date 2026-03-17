import { siteConfig } from "@/content/site.config";
import { Briefcase, FileText, Lightbulb, ShieldCheck } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "tax-consulting": Lightbulb,
  "business-consulting": Briefcase,
  "personal-tax": FileText,
  "corporate-tax": FileText,
  compilation: FileText,
  "business-plans": Lightbulb,
  "audit-support": ShieldCheck,
};

export default function ServicesPage() {
  const { services } = siteConfig;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Services
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Practical accounting and tax support for individuals and small
          businesses in the Greater Toronto Area.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.id] ?? Briefcase;
          return (
            <div
              key={service.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {service.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

