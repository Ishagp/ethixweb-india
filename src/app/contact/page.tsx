import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team | Ethixweb India",
  description:
    "Get in touch with Ethixweb India to discuss full-stack development, UI design systems, and digital product engineering.",
};

const inquiryDirectives = [
  {
    title: "Project Scope & Timelines",
    description: "Share your high-level objectives, deadlines, or technical specifications for an upfront feasibility evaluation.",
  },
  {
    title: "Direct Engineering Access",
    description: "Inquiries are routed directly to technical leads who review architecture viability rather than sales middlemen.",
  },
  {
    title: "NDA & Confidentiality",
    description: "We are pleased to execute non-disclosure agreements prior to reviewing sensitive proprietary requirements.",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-slate-50/40">
      {/* Banner */}
      <section className="bg-gradient-to-b from-slate-50/80 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-rose-600 font-semibold text-xs uppercase tracking-wider">
              Start a Conversation
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4 leading-tight">
              Let&apos;s engineer your next digital platform.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Whether you are scoping a greenfield software product or redesigning an existing web application,
              our team in Bengaluru is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Contact Info + Contact Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left side: Office details, direct email, expectations */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  Direct Inquiries & Headquarters
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Have an urgent requirement or prefer direct email? Reach out to our engineering leads directly.
                </p>
              </div>

              {/* Direct Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Direct Email
                  </span>
                  <a
                    href="mailto:contact@ethixweb.com"
                    className="block text-lg font-bold text-rose-600 hover:text-rose-700 transition-colors mt-0.5"
                  >
                    contact@ethixweb.com
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Client Support & Consultation
                  </span>
                  <p className="text-sm text-slate-800 font-medium mt-0.5">
                    Dedicated Support for Indian Enterprises
                  </p>
                  <p className="text-xs text-slate-500">
                    Operating across IST business hours
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Typical Response Time
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Within 24 business hours (Monday – Friday, IST)
                  </p>
                </div>
              </div>

              {/* What to expect checklist */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  What Happens Next?
                </h3>
                <div className="space-y-3">
                  {inquiryDirectives.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
