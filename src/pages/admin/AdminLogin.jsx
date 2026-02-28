import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const redirectTo = location.state?.from || "/admin";
        navigate(redirectTo, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [location.state, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl">
        <p className="text-sm text-blue-300/80">Admin Access</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-blue-200/80">
          Use your admin email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-blue-200/70">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
              placeholder="admin@navorax.com"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-blue-200/70">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-xs text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
