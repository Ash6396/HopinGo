import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DriverCTA() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-premium border border-white/10 shadow-2xl p-10 sm:p-16 text-center"
        >
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.05),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-bold text-brand-400 mb-8 shadow-sm">
              <ShieldCheck size={16} /> Premium Driver Program
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              Drive with HopinGo and keep <span className="text-gradient">100%</span> of your earnings.
            </h2>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-medium">
              Zero commission, transparent payouts, and safety-first tools built for drivers. 
              Join the revolution today.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Link
                to="/driver/apply"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-8 py-4 text-base font-bold overflow-hidden transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] w-full sm:w-auto"
              >
                <span className="relative z-10">Apply as Driver</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="/coming-soon"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-transparent text-white px-8 py-4 text-base font-bold hover:bg-white/5 transition-all w-full sm:w-auto"
              >
                Driver app coming soon
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
