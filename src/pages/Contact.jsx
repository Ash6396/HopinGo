import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const contactCards = [
  {
    title: "Email",
    value: "support@navorax.in",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "7088802337",
    icon: Phone,
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
                Contact us
              </p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Let us know how we can <span className="text-gradient">help.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                Partnerships, driver onboarding, rider feedback, or city
                launches. We reply within one business day.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] glass-card p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white">
                  Send a message
                </h2>
                <p className="mt-3 text-base text-slate-300">
                  Share your details and a short message. Our team will reach
                  out.
                </p>

                {submitted && (
                  <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
                    Thanks! Your message is received.
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 grid gap-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Name
                    </label>
                    <input
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Phone
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                      placeholder="Contact number"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Subject
                    </label>
                    <input
                      required
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 px-4 py-3 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium resize-none"
                      placeholder="Write your message here"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-8 py-3.5 text-base font-bold transition hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                    >
                      Send message
                    </button>
                    <a
                      href="mailto:support@navorax.in"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 text-white px-8 py-3.5 text-base font-bold hover:bg-white/5 transition-all"
                    >
                      Email directly
                    </a>
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] glass-card p-8 sm:p-10">
                  <h3 className="text-2xl font-bold text-white">Reach us</h3>
                  <p className="mt-3 text-base text-slate-300">
                    Prefer a quick call or message? Use the details below.
                  </p>
                  <div className="mt-8 grid gap-4">
                    {contactCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.title}
                          className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 transition-colors"
                        >
                          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                            <Icon size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              {card.title}
                            </p>
                            <p className="text-base font-medium text-white mt-1">{card.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-brand-500/20 bg-gradient-premium p-8 sm:p-10">
                  <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Drivers</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Want to drive with us?
                  </h3>
                  <p className="mt-3 text-base text-slate-300">
                    Apply in minutes and start earning with zero commission.
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
