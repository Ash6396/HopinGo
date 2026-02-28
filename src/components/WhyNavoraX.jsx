import { motion } from "framer-motion";
import {
  BadgeIndianRupee,
  Users,
  Shield,
  Ban,
  Smartphone,
  Eye,
} from "lucide-react";

const points = [
  { icon: BadgeIndianRupee, text: "Cheapest rides", color: "from-blue-500 to-cyan-400" },
  { icon: Users, text: "Maximum earning for drivers", color: "from-cyan-400 to-emerald-400" },
  { icon: Shield, text: "Women safety advanced mode", color: "from-indigo-500 to-purple-500" },
  { icon: Ban, text: "No cancellation loss", color: "from-rose-500 to-orange-400" },
  { icon: Smartphone, text: "Dual device tracking", color: "from-fuchsia-500 to-purple-400" },
  { icon: Eye, text: "Transparent system", color: "from-brand-500 to-accent-500" },
];

export default function WhyNavoraX() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-950/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.8),rgba(2,6,23,1))]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Why <span className="text-gradient">HopinGo</span> Will Win
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-300"
          >
            Built for fairness, uncompromising safety, and maximum affordability. 
            Powered by NavoraX technology.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map(({ icon: Icon, text, color }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group flex flex-col items-center sm:items-start gap-5 rounded-3xl glass-card border border-white/5 p-8 sm:p-10 hover:border-white/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${color} bg-opacity-10 border border-white/10 text-white shadow-lg grid place-items-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                <Icon size={28} className="relative z-10" />
              </div>
              
              <h3 className="text-white text-xl font-bold text-center sm:text-left tracking-tight relative z-10 mt-2">{text}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
