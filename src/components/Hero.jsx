import { motion } from "framer-motion";
import { Download, ShieldCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 overflow-hidden bg-dark-bg">
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-spin-slow" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid xl:grid-cols-2 gap-16 items-center">
        <div className="text-center xl:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Live Beta Available Now
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            India’s First <br className="hidden sm:block" />
            <span className="text-gradient drop-shadow-sm">0% Commission</span> <br className="hidden sm:block" />
            Ride App.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto xl:mx-0 leading-relaxed"
          >
            Experience a new era of ride-sharing where drivers keep <strong className="text-white font-bold">100%</strong> of their earnings and riders pay less. Powered by NavoraX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4"
          >
            <Link
              id="download"
              to="/coming-soon"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-950 px-8 py-4 text-base font-bold overflow-hidden transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white via-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
              <span className="relative z-10">Download App</span>
            </Link>
            
            <a
              href="#driver"
              className="group inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-base font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105"
            >
              <ShieldCheck size={20} className="text-brand-400 group-hover:text-white transition-colors" />
              <span>Apply to Drive</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-6 text-sm text-slate-400 max-w-xl mx-auto xl:mx-0"
          >
            <div className="flex items-center justify-center xl:justify-start gap-3">
              <div className="p-2 rounded-full bg-brand-500/10 text-brand-400">
                <MapPin size={18} />
              </div>
              <span className="font-medium text-slate-300">Dual-device Live Tracking</span>
            </div>
            <div className="flex items-center justify-center xl:justify-start gap-3">
              <div className="p-2 rounded-full bg-accent-500/10 text-accent-400">
                <ShieldCheck size={18} />
              </div>
              <span className="font-medium text-slate-300">Post-ride Safety Mode</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="relative hidden xl:block z-10"
        >
          <div className="relative aspect-[4/3] rounded-[2.5rem] bg-gradient-premium border border-white/10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.15),transparent_60%)]" />
            
            <div className="absolute inset-0 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-400/50" />
                </div>
                <div className="h-2 w-24 rounded-full bg-white/10" />
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-2xl p-4 flex flex-col justify-end"
                >
                  <div className="h-2 w-1/2 bg-brand-400/30 rounded-full mb-2" />
                  <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                </motion.div>
                <div className="grid grid-rows-2 gap-4">
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card rounded-2xl flex items-center justify-center p-4"
                  >
                     <div className="h-10 w-10 rounded-full bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
                       <MapPin className="text-accent-400" size={20} />
                     </div>
                  </motion.div>
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="glass-card rounded-2xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative shiny edge */}
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 top-20 glass-card px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-2xl"
          >
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <span className="text-green-400 font-bold text-xs">₹</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Driver Earnings</p>
              <p className="text-sm font-bold text-white">100%</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
