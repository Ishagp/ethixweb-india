import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative subtle ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-6">
            Ready to Build?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2]">
            Let&apos;s build a digital platform your team and customers will love.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Whether you are launching a greenfield web application, modernizing legacy systems,
            or building an authoritative corporate website, we are here to help.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-lg hover:shadow-rose-600/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get in Touch
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all duration-200"
            >
              About Ethixweb India
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <span>Direct engineer consultation</span>
            <span className="hidden sm:inline">•</span>
            <span>Fast turnaround proposals</span>
            <span className="hidden sm:inline">•</span>
            <span>Transparent pricing & milestones</span>
          </div>
        </div>
      </div>
    </section>
  );
}
