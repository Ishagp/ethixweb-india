import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "About Us | Ethixweb India",
  description:
    "Learn about our engineering philosophy, standards of craftsmanship, and mission to deliver high-performance digital systems for Indian businesses.",
};

const companyValues = [
  {
    title: "Engineering Integrity",
    description:
      "We write code that is intended to last. No brittle quick fixes, no mystery hacks, and no unmaintainable dependencies. Every line is reviewed and typed with care.",
  },
  {
    title: "Transparency First",
    description:
      "We maintain open communication with our clients. You have full visibility into task boards, architecture choices, sprint progress, and code repositories from day one.",
  },
  {
    title: "Contextual for India",
    description:
      "We design specifically for the realities of the Indian digital ecosystem: heterogeneous device form factors, varied cellular connectivity, and mobile-first consumer habits.",
  },
  {
    title: "Outcome-Driven Delivery",
    description:
      "We measure success not by vanity lines of code, but by tangible business impact: faster page loads, higher lead capture rates, and effortless software maintenance.",
  },
];

const teamDisciplines = [
  {
    role: "Frontend Engineering",
    focus: "Next.js App Router, React 19, TypeScript, Semantic HTML5 & CSS systems",
  },
  {
    role: "Backend & Cloud Architecture",
    focus: "Supabase, PostgreSQL, REST Route Handlers, Edge Computing & Security",
  },
  {
    role: "UI/UX & Design Systems",
    focus: "Atomic design tokens, responsive layouts, accessibility audits & micro-interactions",
  },
  {
    role: "Performance Optimization",
    focus: "Core Web Vitals, asset compression, bundle reduction & Lighthouse tuning",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50/70 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
              About Ethixweb
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-6 leading-tight">
              A software practice dedicated to digital craftsmanship.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Ethixweb was founded on a simple belief: Indian businesses deserve digital products that match
              global engineering standards in performance, design clarity, and longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission & Philosophy */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Our Philosophy
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Moving past disposable agency websites.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Many agencies rely on heavy off-the-shelf templates and bloated page builders that look acceptable initially, but become sluggish and impossible to extend as business requirements scale.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                We take an engineering-first approach. Every project is built on clean modern foundations—Next.js App Router, clean CSS architectures, and scalable data layers. We treat websites as software assets that generate ongoing value.
              </p>
              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700"
                >
                  Explore how we work &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Core Engineering Standards
              </h3>
              <div className="space-y-4">
                {teamDisciplines.map((item) => (
                  <div key={item.role} className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{item.role}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Values */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
              How We Operate
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
              Our Core Principles
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              These principles govern every line of code we write, every component we structure, and every relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyValues.map((val) => (
              <div
                key={val.title}
                className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-base mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </div>
  );
}
