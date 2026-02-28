import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function AdminGuard() {
  const location = useLocation();
  const [state, setState] = useState({ status: "checking", isAdmin: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ status: "no-user", isAdmin: false });
        return;
      }

      try {
        const adminSnap = await getDoc(doc(db, "admins", user.uid));
        setState({ status: "ready", isAdmin: adminSnap.exists() });
      } catch (error) {
        setState({ status: "error", isAdmin: false });
      }
    });

    return () => unsubscribe();
  }, []);

  if (state.status === "checking") {
    return (
      <div className="min-h-screen bg-slate-950 text-blue-100 flex items-center justify-center">
        <div className="text-sm text-blue-200/80">Checking admin access...</div>
      </div>
    );
  }

  if (state.status === "no-user") {
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  }

  if (!state.isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center">
          <p className="text-lg font-semibold text-white">Access denied</p>
          <p className="mt-2 text-sm text-blue-200/80">
            Your account is not authorized to view the admin panel.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium"
            >
              Sign out
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 text-white px-4 py-2 text-sm font-medium"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
