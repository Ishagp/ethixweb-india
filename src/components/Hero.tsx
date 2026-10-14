import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white pt-20 pb-24 md:pt-28 md:pb-32 border-b border-slate-100">
      {/* Subtle radial ambient highlight */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-rose-500/5 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" aria-hidden="true" />
            <span>Digital Product Engineering & Web Development • India</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Modern web engineering for{" "}
            <span className="text-rose-600 underline decoration-rose-200 underline-offset-8 decoration-4">
              forward-thinking
            </span>{" "}
            enterprises.
          </h1>

          {/* Subheading / Value Proposition */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            We design and build fast, resilient web applications, custom digital systems,
            and scalable software platforms tailored for growing businesses and modern startups across India.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Your Project
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
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all duration-200"
            >
              Explore Capabilities
            </Link>
          </div>

          {/* Trust Highlights Checklist */}
          <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Next.js & TypeScript</p>
                <p className="text-xs text-slate-500">Robust, type-safe architectures</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Conversion Focused</p>
                <p className="text-xs text-slate-500">Fast load times & accessible UI</p>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
              <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">End-to-End Delivery</p>
                <p className="text-xs text-slate-500">From concept to deployment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
