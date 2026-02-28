import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px] pointer-events-none" />
      
      <div className="max-w-xl w-full rounded-[2.5rem] glass-card p-10 sm:p-14 text-center relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
          HopinGo
        </p>
        <p className="mt-1 text-xs text-slate-400 font-medium">Powered by NavoraX</p>
        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          <span className="text-gradient">Coming</span> Soon
        </h1>
        <p className="mt-4 text-base text-slate-300 leading-relaxed">
          The app download experience is almost ready. Check back shortly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-0.5"
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 text-white px-6 py-3 text-sm font-bold hover:bg-white/5 transition-all"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
