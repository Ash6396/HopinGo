import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhyNavoraX from "./components/WhyNavoraX";
import Footer from "./components/Footer";
import Section from "./components/Section";
import DriverCTA from "./components/DriverCTA";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import ComingSoon from "./pages/ComingSoon";
import DriverApply from "./pages/DriverApply";

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDrivers = lazy(() => import("./pages/admin/AdminDrivers"));
const AdminGuard = lazy(() => import("./components/admin/AdminGuard"));

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <Navbar />
      <main>
        <Section id="hero">
          <Hero />
        </Section>
        <Section id="features">
          <Features />
        </Section>
        <Section id="why">
          <WhyNavoraX />
        </Section>
        <Section id="driver">
          <DriverCTA />
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-blue-100 flex items-center justify-center">
          <div className="text-sm text-blue-200/80">Loading...</div>
        </div>
      }
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/driver/apply" element={<DriverApply />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminDrivers />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
