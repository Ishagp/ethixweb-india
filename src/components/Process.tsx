import Link from "next/link";

interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Architecture",
    tagline: "Clarity before code",
    description:
      "We unpack your business requirements, define user personas, map data structures, and establish system architecture blueprints to eliminate ambiguity early.",
    deliverables: ["Product Roadmap", "Tech Stack Blueprint", "Data Schema"],
  },
  {
    step: "02",
    title: "Design System & Wireframing",
    tagline: "Intentional user experiences",
    description:
      "We design an end-to-end design token system, responsive layouts, and interactive component prototypes prioritizing usability and high clarity.",
    deliverables: ["Tailwind Design Tokens", "UI Components", "Responsive Layouts"],
  },
  {
    step: "03",
    title: "Iterative Engineering",
    tagline: "Clean, testable code",
    description:
      "We build with Next.js App Router, TypeScript, and modern state patterns. Every milestone includes code audits, performance tracking, and security checks.",
    deliverables: ["Production Codebase", "API Endpoints", "Type Definitions"],
  },
  {
    step: "04",
    title: "Deployment & Optimization",
    tagline: "Reliable launch to market",
    description:
      "We configure production CI/CD pipelines, optimize assets, verify Core Web Vitals, and hand over clean documentation for painless maintenance.",
    deliverables: ["CI/CD Pipeline", "Production Deployment", "Handoff Documentation"],
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
            Our Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            A transparent, milestone-driven development process.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            No guessing games or opaque timelines. We work in structured sprints designed to keep you informed at every step of the product journey.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-black text-rose-600">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Phase {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-rose-600/90 mt-1 mb-3">
                  {item.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  Key Outcomes
                </p>
                <ul className="space-y-1">
                  {item.deliverables.map((d) => (
                    <li key={d} className="text-xs text-slate-700 flex items-center">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mr-2 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Need an agile team that can adapt to your internal engineering workflows?{" "}
            <Link href="/contact" className="text-rose-600 font-semibold hover:underline">
              Let&apos;s discuss your timeline
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
