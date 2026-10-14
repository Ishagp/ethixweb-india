import Link from "next/link";

interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  techStack: string[];
  scope: string;
}

const projects: WorkProject[] = [
  {
    id: "fintech-portal",
    title: "Enterprise Financial Analytics Platform",
    subtitle: "High-throughput data visualization & reporting suite",
    category: "Full-Stack Web App",
    description:
      "Engineered an interactive analytics interface for financial reconciliation, featuring real-time transaction streaming, exportable statements, and sub-100ms dashboard filtering.",
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    scope: "Architecture, UI Design System & Frontend Implementation",
  },
  {
    id: "healthtech-onboarding",
    title: "Healthcare Provider Consultation Portal",
    subtitle: "Streamlined multi-step digital patient intake system",
    category: "Workflow Engine",
    description:
      "Built a compliant, mobile-optimized patient intake and specialist scheduling web platform with instant validation, automated SMS reminders, and zero layout shift on mobile networks.",
    techStack: ["React 19", "Next.js", "REST APIs", "Tailwind CSS"],
    scope: "Form Engine, API Wiring & Accessibility Auditing",
  },
  {
    id: "b2b-supply-chain",
    title: "B2B Logistics & Inventory Management Hub",
    subtitle: "Unified vendor portal with dynamic order routing",
    category: "Enterprise System",
    description:
      "Delivered a centralized warehouse operations console enabling logistics dispatchers to track consignments across interstate transport corridors with real-time state management.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Server Actions"],
    scope: "Full-Stack Engineering & Role-Based Access Control",
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
              Selected Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
              Crafted with engineering rigor and attention to detail.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A sample of the digital applications, bespoke dashboards, and client portals we architect.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-semibold text-rose-600 hover:text-rose-700 shrink-0 group"
          >
            Explore all capabilities
            <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Projects Cards */}
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className="p-8 sm:p-10 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left meta & description */}
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Project #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-1 mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-2">
                      <span className="text-slate-400 font-normal">Scope of Work: </span>
                      {project.scope}
                    </p>
                  </div>
                </div>

                {/* Right tech stack & cta */}
                <div className="lg:col-span-4 bg-slate-50/70 p-6 rounded-xl border border-slate-100 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Technology Architecture
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700"
                    >
                      Inquire about a similar build &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
