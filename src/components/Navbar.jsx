import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/5 glass transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-500 shadow-[0_0_20px_rgba(20,184,166,0.5)] grid place-items-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
            H
          </div>
          <div className="leading-tight">
            <p className="text-xl font-bold tracking-tight text-white">
              HopinGo
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 border border-white/10 rounded-full px-8 py-3 bg-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-300 ${isActive ? "text-brand-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" : "text-slate-300 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/coming-soon"
            className="inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-6 py-2.5 text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Download App
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 glass">
          <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium rounded-lg px-4 py-3 transition-colors ${isActive ? "bg-white/10 text-brand-400" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/coming-soon"
              onClick={() => setOpen(false)}
              className="mt-2 text-base rounded-lg px-4 py-3 bg-white text-slate-950 font-bold text-center"
            >
              Download App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
