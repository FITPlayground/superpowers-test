import { siteConfig } from "@/content/site.config";

export default function ContactPage() {
  const { contact, social } = siteConfig;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Contact
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Share a bit about your situation and Stanley will follow up with a
            short call or email to confirm next steps. No obligation.
          </p>
          <form className="mt-4 space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="subject"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                placeholder="How can we help?"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                placeholder="Share any details that will help Stanley prepare."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90"
            >
              Send message
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              For this demo, the form is for layout only. In production, it
              would save securely and optionally send an email notification.
            </p>
          </form>
        </section>
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Contact details
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {contact.address}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {contact.phone}
            </p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {contact.email}
            </p>
          </div>
          {social?.linkedin ? (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Social
              </h3>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center text-sm font-medium text-accent hover:underline"
              >
                LinkedIn
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

