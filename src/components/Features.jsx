import { motion } from 'framer-motion'
import { BadgeCheck, Smartphone, Shield, Timer, Rocket, Wallet } from 'lucide-react'

const features = [
  {
    title: 'Non-Commission Policy',
    points: [
      'Zero commission from drivers & customers',
      'Drivers keep 100% earnings',
      'Customers get lowest-cost rides',
    ],
    icon: BadgeCheck,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Dual Device Live Tracking',
    points: [
      'Live ride tracking from 2 devices',
      'One for passenger, one for family/friend',
      'Emphasize safety and transparency',
    ],
    icon: Smartphone,
    color: 'from-cyan-400 to-emerald-400',
  },
  {
    title: 'Post-Ride Safety Mode',
    points: [
      'Tracking stays on until user selects “I reached home safely”',
      'If user taps “NO,” company calls instantly',
      'If danger is verified → nearest police station alerted',
    ],
    icon: Shield,
    color: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'Anti-Cancellation Protection (Driver Protect)',
    points: [
      'Customer gets only 30 sec to cancel',
      'After 30 sec, cancellation penalty',
      'Penalty goes directly into driver’s wallet → zero loss',
    ],
    icon: Timer,
    color: 'from-rose-500 to-orange-400',
  },
  {
    title: 'Auto Driver Future Mode',
    points: [
      'Future update for auto drivers',
      'Earning boost mode',
      'Zero commission = maximum benefit',
    ],
    icon: Rocket,
    color: 'from-fuchsia-500 to-purple-400',
  },
  {
    title: 'Subscription Model',
    points: [
      'Customer: ₹1 per ride or ₹50/month unlimited rides',
      'Driver: ₹100/month – unlimited rides, 0% commission',
    ],
    icon: Wallet,
    color: 'from-emerald-500 to-teal-400',
  },
]

function FeatureCard({ title, points, icon: Icon, color, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative rounded-3xl glass-card p-6 sm:p-8 transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] transition-shadow duration-300 relative z-10`}>
        <Icon size={28} />
      </div>
      
      <h3 className="mt-6 text-xl font-bold text-white tracking-tight relative z-10">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-slate-300 text-sm sm:text-base relative z-10">
        {points.map((p, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className={`mt-1.5 h-2 w-2 rounded-full bg-gradient-to-br ${color} flex-shrink-0 drop-shadow-md`} />
            <span className="leading-relaxed group-hover:text-white transition-colors">{p}</span>
          </li>
        ))}
      </ul>
      
      {/* Decorative border highlight on hover */}
      <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors pointer-events-none" />
    </motion.div>
  )
}

export default function Features() {
  return (
    <section className="py-24 sm:py-32 relative">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 glass bg-white/5 text-brand-300 text-sm font-semibold tracking-wide uppercase"
          >
            Core Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Powerful features designed for <span className="text-gradient">India</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-300"
          >
            Everything that matters for riders and drivers — built-in with advanced safety, maximum earning potential, and absolute transparency.
          </motion.p>

        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
