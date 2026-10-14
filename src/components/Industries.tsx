import Link from "next/link";

interface IndustryCard {
  title: string;
  focus: string;
  description: string;
  useCase: string;
}

const industries: IndustryCard[] = [
  {
    title: "FinTech & Digital Payments",
    focus: "High-security & low latency",
    description:
      "Web applications for transaction reconciliation, account aggregators, lending portals, and financial analytics compliant with local regulatory requirements.",
    useCase: "Customer onboarding flows, loan calculator engines, KYC collection interfaces",
  },
  {
    title: "B2B SaaS & Enterprise Tools",
    focus: "Modular workspaces & dashboards",
    description:
      "Custom software applications designed for high employee productivity, multi-tenant architectures, administrative control boards, and subscription billing.",
    useCase: "Role-based dashboards, inventory systems, team permission consoles",
  },
  {
    title: "Healthcare & Teleconsultation",
    focus: "Data confidentiality & accessibility",
    description:
      "Patient portals, doctor consultation scheduling systems, and diagnostic report download platforms built for maximum clarity and mobile accessibility.",
    useCase: "Appointment booking systems, patient health records viewer, clinic management",
  },
  {
    title: "Direct-to-Consumer & Modern Commerce",
    focus: "High-conversion speed",
    description:
      "Next-generation commerce interfaces that load instantly across Tier-2 & Tier-3 networks, with smooth checkout integrations and mobile-first product discovery.",
    useCase: "Headless store frontends, custom product configurators, localized checkouts",
  },
  {
    title: "Logistics & Supply Chain",
    focus: "Real-time visibility",
    description:
      "Interactive consignment dispatch tracking, fleet management views, and vendor communication consoles built for fast data entry in warehouse conditions.",
    useCase: "Consignment tracking pages, driver assignment interfaces, depot inventory logs",
  },
  {
    title: "Professional Services & Real Estate",
    focus: "Lead qualification & branding",
    description:
      "High-end corporate websites and interactive project inquiry portals engineered to project authoritative brand credibility and capture high-intent inquiries.",
    useCase: "Property inventory showcases, interactive pricing estimators, inquiry captures",
  },
];

export default function Industries() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
            Sectors & Domains
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Domain expertise tailored for the Indian business ecosystem.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From high-growth startups in Bengaluru and Mumbai to established industrial enterprises nationwide,
            we understand the technical requirements and user behaviors across Indian industries.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-rose-600 block mb-1">
                  {ind.focus}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {ind.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Common Implementations:
                </p>
                <p className="text-xs text-slate-700 font-medium">
                  {ind.useCase}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-rose-600 transition-colors"
          >
            Operating in a different sector? Inquire about custom development &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
