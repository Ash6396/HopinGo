import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Users, Sparkles } from "lucide-react";

const highlights = [
  {
    title: "Zero commission",
    description:
      "Drivers keep 100% of their earnings and get transparent payouts.",
    icon: Sparkles,
  },
  {
    title: "Safety first",
    description:
      "Post-ride safety tools and real-time tracking for every trip.",
    icon: ShieldCheck,
  },
  {
    title: "Community focused",
    description:
      "Built with local drivers and riders to improve daily mobility.",
    icon: Users,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="relative">
          <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px]" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
                About HopinGo
              </p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Building a fair, <span className="text-gradient">driver-first</span> ride network.
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                HopinGo is India’s first 100% non-commission ride platform,
                powered by NavoraX. We are building a transparent mobility
                ecosystem where drivers keep what they earn and riders enjoy the
                most affordable fares.
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl glass-card p-8 group hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base text-slate-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl glass-card p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white">
                  Our Mission
                </h2>
                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  We want every driver to earn with dignity and every rider to
                  travel safely and affordably. By removing commissions and
                  building trust-led features, we make mobility fair for
                  everyone.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 text-sm font-medium text-slate-300">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-400" />
                    Transparent fares
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent-400" />
                    Real-time tracking
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-400" />
                    Safety verified drivers
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Fast driver support
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-brand-500/20 bg-gradient-premium p-8 sm:p-10 flex flex-col justify-center">
                <p className="text-sm font-semibold text-brand-400 uppercase tracking-wider">Join the movement</p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  Want to drive with us?
                </h3>
                <p className="mt-3 text-base text-slate-300">
                  Apply in minutes and start earning with zero commission today.
                </p>
                <a
                  href="/driver/apply"
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3.5 text-base font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-0.5"
                >
                  Apply as Driver
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
