import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities | Ethixweb India",
  description:
    "Explore our full-stack web development, design systems, cloud integrations, and performance engineering tailored for Indian enterprises.",
};

interface DetailedService {
  id: string;
  category: string;
  title: string;
  businessOutcome: string;
  description: string;
  deliverables: string[];
  techStack: string[];
}

const detailedServices: DetailedService[] = [
  {
    id: "full-stack-web",
    category: "Architecture & Engineering",
    title: "Custom Full-Stack Web Applications",
    businessOutcome: "Accelerate time-to-market while avoiding technical debt and scalability bottlenecks.",
    description:
      "We build resilient web platforms utilizing Next.js App Router, TypeScript, and relational databases. Designed from the foundation up to handle high transaction volumes and complex business logic.",
    deliverables: [
      "Modular, maintainable Next.js App Router architecture",
      "Type-safe data modeling & Supabase/PostgreSQL schema",
      "Automated testing & linting setup",
      "Scalable REST and Server Action APIs",
    ],
    techStack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Supabase / PostgreSQL"],
  },
  {
    id: "design-systems",
    category: "Interface & Product Design",
    title: "Design Systems & Conversion UI/UX",
    businessOutcome: "Increase conversion rates and establish an authoritative, trustworthy brand presence.",
    description:
      "A systematic approach to user interfaces. We establish consistent typography, color palettes, responsive layouts, and interactive micro-states that look clean on mobile devices and desktops alike.",
    deliverables: [
      "Comprehensive Tailwind CSS design token setup",
      "Accessible, reusable UI component library",
      "Responsive navigation, modals, and input fields",
      "WCAG 2.1 AA accessibility compliance",
    ],
    techStack: ["Tailwind CSS", "Semantic HTML5", "Modern CSS Tokens", "Figma Design Specs"],
  },
  {
    id: "core-web-vitals",
    category: "Optimization & Speed",
    title: "Core Web Vitals & Performance Engineering",
    businessOutcome: "Lower bounce rates, improve organic Google search rankings, and retain Tier-2/3 Indian network users.",
    description:
      "With high smartphone usage across varied network bandwidths in India, sub-second load times are paramount. We eliminate layout shifts, optimize asset bundles, and implement edge caching.",
    deliverables: [
      "Sub-second Largest Contentful Paint (LCP)",
      "Zero Cumulative Layout Shift (CLS) safeguards",
      "Next.js Turbopack image and asset pipelines",
      "Comprehensive Lighthouse audit score improvements",
    ],
    techStack: ["Next.js Image Optimization", "Font Subsetting", "Edge Middleware", "Bundle Analyzer"],
  },
  {
    id: "cloud-integrations",
    category: "Backend & Integrations",
    title: "Backend APIs & Database Integrations",
    businessOutcome: "Automate administrative workflows, secure customer data, and streamline business operations.",
    description:
      "We design secure API routes, connect cloud databases, configure role-based access authentication, and wire external transactional webhooks for notifications and invoicing.",
    deliverables: [
      "Protected admin endpoints and role-based permissions",
      "Supabase row-level security (RLS) enforcement",
      "Transactional email/SMS notification dispatchers",
      "Clear OpenAPI documentation for internal developers",
    ],
    techStack: ["Supabase Auth & Database", "Next.js Route Handlers", "Row-Level Security (RLS)"],
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
              Engineering Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-6 leading-tight">
              Software engineering focused on measurable business outcomes.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              We do not build bloated templates. We architect bespoke digital systems, web applications,
              and design libraries that empower Indian businesses to compete at an international standard.
            </p>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {detailedServices.map((service, idx) => (
              <article
                key={service.id}
                className="p-8 sm:p-10 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Outcome, Title, Description */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                        {service.category}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                      {service.title}
                    </h2>

                    {/* Business outcome badge */}
                    <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Business Outcome
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {service.businessOutcome}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <Link
                      href="/contact"
                      className="inline-flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 group"
                    >
                      Inquire about {service.title}
                      <span className="ml-1.5 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>

                  {/* Right Column: Deliverables & Stack */}
                  <div className="lg:col-span-5 bg-slate-50/80 p-6 rounded-xl border border-slate-100 space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start text-xs sm:text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-2.5 shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        Core Technologies
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <ContactCTA />
    </div>
  );
}
