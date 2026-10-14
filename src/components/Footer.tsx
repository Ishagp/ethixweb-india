import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
              aria-label="Ethixweb India Homepage"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 shadow-sm">
                <Image
                  src="/images/emblem.webp"
                  alt="Ethixweb Emblem"
                  width={26}
                  height={26}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Ethixweb<span className="text-rose-500">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 -mt-1">
                  India
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              We manage digital operations, from AI automation and CRM integrations to custom websites and web applications tailored for growing enterprises.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-rose-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-rose-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-rose-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-rose-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Capabilities
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Custom Full-Stack Development</li>
              <li>High-Conversion Web Applications</li>
              <li>Cloud & API Integrations</li>
              <li>UI/UX Strategy & Performance Optimization</li>
            </ul>
          </div>

          {/* Contact & Presence */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Operations & Contact
            </h3>
            <div className="text-sm text-slate-400 space-y-1.5 leading-relaxed">
              <p>Global Digital Operations Network</p>
              <p>Dedicated Client Support for India</p>
              <p className="pt-2 text-slate-300">
                Email:{" "}
                <a
                  href="mailto:contact@ethixweb.com"
                  className="text-rose-400 hover:underline"
                >
                  contact@ethixweb.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Ethixweb India. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
