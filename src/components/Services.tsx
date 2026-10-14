import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: "custom-web",
    title: "Full-Stack Web Applications",
    category: "Architecture & Engineering",
    description:
      "Bespoke web applications built on modern React and Next.js App Router patterns with reliable server actions, clean API integrations, and robust database backends.",
    features: [
      "App Router & Server-Side Rendering",
      "Type-safe TypeScript codebase",
      "Scalable database models & APIs",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Systems",
    category: "Product & Interface Design",
    description:
      "Systematic design systems and component libraries crafted for high usability, consistent brand personality, and seamless accessibility across all form factors.",
    features: [
      "Modular Tailwind component systems",
      "WCAG accessibility standards",
      "Mobile-first responsive workflows",
    ],
  },
  {
    id: "performance-optimization",
    title: "Performance & Core Web Vitals",
    category: "Optimization & Audit",
    description:
      "Engineering optimizations specifically geared towards reducing layout shifts, speeding up first contentful paint, and delivering fast experiences on Indian network conditions.",
    features: [
      "Image & asset optimization",
      "Bundle size minification",
      "Sub-second page transitions",
    ],
  },
  {
    id: "api-backend",
    title: "API Development & Cloud Integrations",
    category: "Cloud & Backend",
    description:
      "Secure backend endpoints, relational data storage via Supabase/PostgreSQL, authentication workflows, and third-party SaaS integrations.",
    features: [
      "RESTful & Edge API routes",
      "Secure role-based access control",
      "Webhook & payment gateway wiring",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Engineered for performance, built to scale.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We provide specialized digital engineering services designed to solve real business challenges,
            replace outdated systems, and accelerate customer conversion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              className="group p-8 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {service.category}
                  </span>
                  <span className="text-xs font-bold text-rose-600 px-2 py-0.5 rounded bg-rose-50 border border-rose-100">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2.5 pt-6 border-t border-slate-100">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 group/link"
                >
                  Discuss this capability
                  <span className="ml-1.5 transition-transform group-hover/link:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-700 font-medium text-center sm:text-left">
            Have a unique architecture or migration requirement? We provide customized engineering solutions.
          </p>
          <Link
            href="/services"
            className="shrink-0 text-sm font-semibold text-slate-900 hover:text-rose-600 underline underline-offset-4"
          >
            View Full Service Overview
          </Link>
        </div>
      </div>
    </section>
  );
}
