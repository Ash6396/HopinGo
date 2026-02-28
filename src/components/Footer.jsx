import { Apple, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 relative overflow-hidden">
      <div className="absolute -top-64 -right-64 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-64 -left-64 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-500 grid place-items-center text-white font-bold shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                H
              </div>
              <div className="leading-tight">
                <p className="text-white font-bold text-lg">HopinGo</p>
                <p className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">
                  Powered by NavoraX
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm font-medium leading-relaxed">
              India’s First 100% Non-Commission Ride Platform — built to empower
              drivers and delight riders.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white font-bold mb-4">Company</p>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li>
                  <Link to="/about" className="hover:text-brand-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brand-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-brand-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-4">Product</p>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li>
                  <a href="#features" className="hover:text-brand-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/coming-soon" className="hover:text-brand-400 transition-colors">
                    Download
                  </Link>
                </li>
                <li>
                  <a href="#driver" className="hover:text-brand-400 transition-colors">
                    Become a Driver
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white font-bold mb-4">Follow</p>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li>
                  <a href="#" className="hover:text-brand-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-400 transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white font-bold">Get the App</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/coming-soon"
                className="inline-flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors shadow-lg"
              >
                <div className="p-1.5 rounded-lg bg-white/10">
                  <Play size={16} className="text-brand-400" />
                </div>
                <div className="text-left flex flex-col items-start leading-none">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Get it on</span>
                  <span>Play Store</span>
                </div>
              </Link>
              <Link
                to="/coming-soon"
                className="inline-flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors shadow-lg"
              >
                <div className="p-1.5 rounded-lg bg-white/10">
                  <Apple size={16} className="text-slate-300" />
                </div>
                <div className="text-left flex flex-col items-start leading-none">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Download on</span>
                  <span>App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs font-semibold text-slate-500 tracking-wide">
          © {new Date().getFullYear()} HopinGo.
        </div>
      </div>
    </footer>
  );
}
