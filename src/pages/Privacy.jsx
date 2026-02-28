import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    title: "Overview",
    body: "We respect your privacy and are committed to protecting your data. This policy explains what we collect, how we use it, and your choices.",
  },
  {
    title: "Data we collect",
    body: "We may collect account details, contact information, trip history, device identifiers, and location data required to provide safe rides and driver services.",
  },
  {
    title: "How we use data",
    body: "We use your data to operate the service, improve safety, process payments, provide support, and comply with legal obligations.",
  },
  {
    title: "Sharing",
    body: "We share data only when needed for trips, payments, safety, or compliance. We never sell your personal data to third parties.",
  },
  {
    title: "Security",
    body: "We use industry-standard safeguards to protect your data, including encryption and access controls, and we review our systems regularly.",
  },
  {
    title: "Your choices",
    body: "You can request account deletion, export your data, or update personal details at any time by contacting support.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Navbar />
      <main className="pt-28 pb-16">
        <section className="relative">
          <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px]" />

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
                Privacy Policy
              </p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Your data, your <span className="text-gradient">control.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
                We prioritize safety and transparency. Below is a summary of how
                HopinGo, powered by NavoraX, handles your information.
              </p>
            </div>

            <div className="mt-16 grid gap-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-3xl glass-card p-8 sm:p-10 hover:border-white/10 transition-colors"
                >
                  <h2 className="text-xl font-bold text-white">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-brand-500/20 bg-gradient-premium p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white">Need help?</h3>
                <p className="mt-2 text-base text-slate-300">
                  Contact us at support@navorax.in for privacy-related questions.
                </p>
              </div>
              <a
                href="/contact"
                className="relative z-10 inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-8 py-3.5 text-base font-bold whitespace-nowrap hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-0.5"
              >
                Contact support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
