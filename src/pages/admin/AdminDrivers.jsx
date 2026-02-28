import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { LogOut, RefreshCcw } from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const STATUS_STYLES = {
  approved: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  rejected: "bg-rose-500/15 text-rose-200 border-rose-400/30",
  pending: "bg-amber-500/15 text-amber-200 border-amber-400/30",
};

const skeletonItems = Array.from({ length: 6 }, (_, index) => ({ id: index }));

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState("");

  const fetchDrivers = async () => {
    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(collection(db, "drivers"));
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setDrivers(data);
    } catch (err) {
      setError("Failed to load drivers. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const normalizedDrivers = useMemo(() => {
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name || driver.fullName || "-",
      email: driver.email || driver.emailAddress || "-",
      vehicle:
        driver.vehicle || driver.vehicleType || driver.vehicleModel || "-",
      vehicleNumber:
        driver.vehicleNumber ||
        driver.vehicleNo ||
        driver.registrationNumber ||
        "-",
      license:
        driver.license || driver.licenseNumber || driver.licenseId || "-",
      aadhaar: driver.aadhaarNumber || driver.aadhaar || "-",
      pan: driver.panNumber || driver.pan || "-",
      phone: driver.phone || driver.mobile || "-",
      city: driver.city || driver.location || "-",
      status: (driver.status || "pending").toLowerCase(),
      photoUrls: driver.photoUrls || {},
    }));
  }, [drivers]);

  const statusCounts = useMemo(() => {
    const counts = {
      all: normalizedDrivers.length,
      approved: 0,
      pending: 0,
      rejected: 0,
    };

    normalizedDrivers.forEach((driver) => {
      if (counts[driver.status] !== undefined) {
        counts[driver.status] += 1;
      }
    });

    return counts;
  }, [normalizedDrivers]);

  const filteredDrivers = useMemo(() => {
    if (statusFilter === "all") {
      return normalizedDrivers;
    }
    return normalizedDrivers.filter((driver) => driver.status === statusFilter);
  }, [normalizedDrivers, statusFilter]);

  const handleStatusChange = async (driverId, status) => {
    setUpdatingId(driverId);

    try {
      await updateDoc(doc(db, "drivers", driverId), { status });
      setDrivers((prev) =>
        prev.map((driver) =>
          driver.id === driverId ? { ...driver, status } : driver,
        ),
      );
    } catch (err) {
      setError("Failed to update status. Try again.");
    } finally {
      setUpdatingId("");
    }
  };

  const handleOpenDoc = (url) => {
    if (!url || url === "-") {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-sm text-blue-300/80">Admin Panel</p>
            <h1 className="text-3xl font-semibold text-white">Drivers</h1>
            <p className="mt-2 text-sm text-blue-200/80">
              Manage driver onboarding and approval status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border border-white/10 bg-slate-900/70 p-1 text-sm">
              <button
                type="button"
                onClick={() => setView("table")}
                className={`px-3 py-1 rounded-md ${view === "table" ? "bg-white text-slate-900" : "text-blue-200/80"}`}
              >
                Table
              </button>
              <button
                type="button"
                onClick={() => setView("cards")}
                className={`px-3 py-1 rounded-md ${view === "cards" ? "bg-white text-slate-900" : "text-blue-200/80"}`}
              >
                Cards
              </button>
            </div>
            <button
              type="button"
              onClick={fetchDrivers}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white"
            >
              <RefreshCcw size={16} /> Refresh
            </button>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-900 px-3 py-2 text-sm font-medium"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { key: "all", label: "All" },
            { key: "approved", label: "Approved" },
            { key: "pending", label: "Pending" },
            { key: "rejected", label: "Rejected" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setStatusFilter(item.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                statusFilter === item.key
                  ? "border-white bg-white text-slate-900"
                  : "border-white/15 text-blue-200/80"
              }`}
            >
              {item.label}
              <span className="rounded-full bg-slate-800/70 px-2 py-0.5 text-[11px] text-blue-100">
                {statusCounts[item.key]}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 grid gap-4">
            {skeletonItems.map((item) => (
              <div
                key={item.id}
                className="h-20 rounded-2xl border border-white/10 bg-slate-900/60 animate-pulse"
              />
            ))}
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center">
            <p className="text-white font-semibold">No drivers found</p>
            <p className="mt-2 text-sm text-blue-200/80">
              Drivers will appear here once they sign up.
            </p>
          </div>
        ) : view === "table" ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-wide text-blue-200/70">
                <tr>
                  <th className="px-4 py-3">Driver</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Vehicle No</th>
                  <th className="px-4 py-3">License</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Docs</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-slate-900/60 text-sm">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-4 py-4">
                      <p className="text-white font-medium">{driver.name}</p>
                      <p className="text-blue-200/70 text-xs">{driver.email}</p>
                      <p className="text-blue-200/70 text-xs">
                        {driver.phone} · {driver.city}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-blue-100/90">
                      {driver.vehicle}
                    </td>
                    <td className="px-4 py-4 text-blue-100/90">
                      {driver.vehicleNumber}
                    </td>
                    <td className="px-4 py-4 text-blue-100/90">
                      {driver.license}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${STATUS_STYLES[driver.status] || STATUS_STYLES.pending}`}
                      >
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-blue-200/80">
                      <div>Aadhaar: {driver.aadhaar}</div>
                      <div>PAN: {driver.pan}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          { key: "profile", label: "Profile" },
                          { key: "license", label: "License" },
                          { key: "aadhaar", label: "Aadhaar" },
                          { key: "pan", label: "PAN" },
                        ].map((docItem) => {
                          const url = driver.photoUrls?.[docItem.key] || "";

                          return (
                            <button
                              key={docItem.key}
                              type="button"
                              onClick={() => handleOpenDoc(url)}
                              disabled={!url}
                              className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white disabled:opacity-40"
                            >
                              {docItem.label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={updatingId === driver.id}
                          onClick={() =>
                            handleStatusChange(driver.id, "approved")
                          }
                          className="rounded-lg bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100 border border-emerald-400/30 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === driver.id}
                          onClick={() =>
                            handleStatusChange(driver.id, "rejected")
                          }
                          className="rounded-lg bg-rose-500/15 px-3 py-1 text-xs text-rose-100 border border-rose-400/30 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold">{driver.name}</p>
                    <p className="text-sm text-blue-200/80">{driver.email}</p>
                    <p className="text-sm text-blue-200/80">
                      {driver.phone} · {driver.city}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-1 text-xs ${STATUS_STYLES[driver.status] || STATUS_STYLES.pending}`}
                  >
                    {driver.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-blue-200/60 text-xs">Vehicle</p>
                    <p className="text-blue-100">{driver.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">Vehicle No</p>
                    <p className="text-blue-100">{driver.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">License</p>
                    <p className="text-blue-100">{driver.license}</p>
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">Aadhaar</p>
                    <p className="text-blue-100">{driver.aadhaar}</p>
                  </div>
                  <div>
                    <p className="text-blue-200/60 text-xs">PAN</p>
                    <p className="text-blue-100">{driver.pan}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { key: "profile", label: "Profile" },
                    { key: "license", label: "License" },
                    { key: "aadhaar", label: "Aadhaar" },
                    { key: "pan", label: "PAN" },
                  ].map((docItem) => {
                    const url = driver.photoUrls?.[docItem.key] || "";

                    return (
                      <button
                        key={docItem.key}
                        type="button"
                        onClick={() => handleOpenDoc(url)}
                        disabled={!url}
                        className="rounded-lg border border-white/15 px-3 py-2 text-xs text-white disabled:opacity-40"
                      >
                        {docItem.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    disabled={updatingId === driver.id}
                    onClick={() => handleStatusChange(driver.id, "approved")}
                    className="flex-1 rounded-lg bg-emerald-500/15 px-3 py-2 text-xs text-emerald-100 border border-emerald-400/30 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === driver.id}
                    onClick={() => handleStatusChange(driver.id, "rejected")}
                    className="flex-1 rounded-lg bg-rose-500/15 px-3 py-2 text-xs text-rose-100 border border-rose-400/30 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
