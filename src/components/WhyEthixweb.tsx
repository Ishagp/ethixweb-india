import Link from "next/link";

interface ValuePillar {
  title: string;
  description: string;
  badge: string;
}

const pillars: ValuePillar[] = [
  {
    badge: "Engineering First",
    title: "No Bloated Templates, Pure Architecture",
    description:
      "We avoid heavy, unmaintainable page-builder plugins. Every project is crafted from clean Next.js, React, and Tailwind CSS code that compiles down to lean, lightning-fast assets.",
  },
  {
    badge: "Performance & SEO",
    title: "Optimized for Indian Network Conditions",
    description:
      "With high mobile usage and variable connectivity speeds, we implement minimal JavaScript payloads, efficient server rendering, and zero layout shift to guarantee smooth user experiences.",
  },
  {
    badge: "Direct Collaboration",
    title: "Direct Engineer-to-Founder Communication",
    description:
      "You collaborate directly with experienced software engineers who understand software design patterns and business trade-offs, eliminating bureaucratic translation loss.",
  },
  {
    badge: "Long-Term Maintainability",
    title: "Documented & Type-Safe From Day One",
    description:
      "Every module is strictly typed using TypeScript and structured with clear conventions so your internal teams can easily maintain, extend, and audit the application over time.",
  },
];

export default function WhyEthixweb() {
  return (
    <section className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
            Why Ethixweb
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Built on engineering excellence, not generic shortcuts.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The difference between an ordinary agency website and a world-class digital product lies in architecture, discipline, and attention to nuance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100 mb-4">
                  {pillar.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/about"
                  className="text-xs font-semibold text-slate-800 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                >
                  Learn about our philosophy &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
