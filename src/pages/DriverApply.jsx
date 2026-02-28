import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Hash,
  FileText,
  UploadCloud,
  CheckCircle2,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { db } from "../lib/firebase";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  vehicle: "",
  vehicleNumber: "",
  licenseNumber: "",
  aadhaarNumber: "",
  panNumber: "",
};

const initialUploads = {
  profile: null,
  license: null,
  aadhaar: null,
  pan: null,
};

const initialUploading = {
  profile: false,
  license: false,
  aadhaar: false,
  pan: false,
};

const uploadFields = [
  { key: "profile", label: "Profile photo (selfie)" },
  { key: "license", label: "Driving license photo" },
  { key: "aadhaar", label: "Aadhaar card photo" },
  { key: "pan", label: "PAN card photo" },
];

export default function DriverApply() {
  const [form, setForm] = useState(initialForm);
  const [uploads, setUploads] = useState(initialUploads);
  const [uploading, setUploading] = useState(initialUploading);
  const [widgetReady, setWidgetReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const uploadFolder =
    import.meta.env.VITE_CLOUDINARY_FOLDER || "hopingo/drivers";
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const widgetUnavailable =
    !widgetReady || !cloudName || !cloudApiKey || !uploadPreset;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.cloudinary) {
      setWidgetReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => setWidgetReady(true);
    script.onerror = () =>
      setError("Upload widget failed to load. Please refresh.");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openUploadWidget = (docKey, label) => {
    if (!widgetReady) {
      return;
    }

    if (!cloudName || !cloudApiKey || !uploadPreset) {
      setError("Missing Cloudinary configuration.");
      return;
    }

    setError("");
    setUploading((prev) => ({ ...prev, [docKey]: true }));

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        apiKey: cloudApiKey,
        folder: uploadFolder,
        resourceType: "image",
        type: "upload",
        sources: ["local", "camera"],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "pdf"],
        showAdvancedOptions: false,
        uploadPreset,
        text: {
          "queue.title": `${label} upload`,
        },
      },
      (widgetError, result) => {
        if (widgetError) {
          setError(widgetError.message || "Upload failed. Try again.");
          setUploading((prev) => ({ ...prev, [docKey]: false }));
          return;
        }

        if (result?.event === "success") {
          setUploads((prev) => ({
            ...prev,
            [docKey]: {
              url: result.info.secure_url,
              publicId: result.info.public_id,
              originalFilename: result.info.original_filename,
            },
          }));
          setUploading((prev) => ({ ...prev, [docKey]: false }));
        }

        if (result?.event === "close") {
          setUploading((prev) => ({ ...prev, [docKey]: false }));
        }
      },
    );

    widget.open();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (Object.values(uploading).some(Boolean)) {
      setError("Please wait for uploads to finish.");
      setLoading(false);
      return;
    }

    const missingUploads = uploadFields.filter(
      (field) => !uploads[field.key]?.publicId,
    );

    if (missingUploads.length) {
      setError("Please upload profile, license, Aadhaar, and PAN photos.");
      setLoading(false);
      return;
    }

    try {
      const driverRef = doc(
        db,
        "drivers",
        `${form.email.trim()}-${form.phone.trim()}`,
      );

      await setDoc(driverRef, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        vehicle: form.vehicle.trim(),
        vehicleNumber: form.vehicleNumber.trim(),
        licenseNumber: form.licenseNumber.trim(),
        aadhaarNumber: form.aadhaarNumber.trim(),
        panNumber: form.panNumber.trim(),
        photoUrls: {
          profile: uploads.profile?.url || "",
          license: uploads.license?.url || "",
          aadhaar: uploads.aadhaar?.url || "",
          pan: uploads.pan?.url || "",
        },
        photoPublicIds: {
          profile: uploads.profile?.publicId || "",
          license: uploads.license?.publicId || "",
          aadhaar: uploads.aadhaar?.publicId || "",
          pan: uploads.pan?.publicId || "",
        },
        uploadProvider: "cloudinary",
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setForm(initialForm);
      setUploads(initialUploads);
    } catch (err) {
      setError(err?.message || "Submit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent-500/10 blur-[100px] pointer-events-none" />

        <div className="rounded-[2.5rem] glass-card p-8 sm:p-12 relative overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
            Driver onboarding
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Apply as <span className="text-gradient">Driver</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Fill your details and we will verify your documents to get you on
            the road and earning 100%.
          </p>

          {submitted && (
            <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-base font-medium text-emerald-400">
              आवेदन सफल! Your application is submitted and under review.
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-xl border border-rose-500/30 bg-rose-500/10 px-6 py-4 text-base font-medium text-rose-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            <div className="sm:col-span-2 group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Full Name
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Mobile Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                City
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="e.g. Mumbai"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Vehicle Type/Model
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Car size={18} />
                </div>
                <input
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="e.g. Maruti Swift Dzire"
                />
              </div>
            </div>

            <div className="group sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Vehicle Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Hash size={18} />
                </div>
                <input
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="e.g. MH 01 AB 1234"
                />
              </div>
            </div>

            <div className="sm:col-span-2 pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-sm font-semibold text-brand-400 uppercase tracking-widest bg-brand-500/10 px-4 py-1.5 rounded-full border border-brand-500/20">
                  Document Id
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>
            </div>

            <div className="group sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Driving License Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <FileText size={18} />
                </div>
                <input
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500 uppercase"
                  placeholder="e.g. MH0120110012345"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                Aadhaar Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <FileText size={18} />
                </div>
                <input
                  name="aadhaarNumber"
                  value={form.aadhaarNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500"
                  placeholder="12-digit Aadhaar"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-focus-within:text-brand-400 transition-colors">
                PAN Number
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <FileText size={18} />
                </div>
                <input
                  name="panNumber"
                  value={form.panNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 pl-11 pr-4 py-3.5 text-base text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium placeholder-slate-500 uppercase"
                  placeholder="10-character PAN"
                />
              </div>
            </div>

            <div className="sm:col-span-2 pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-sm font-semibold text-accent-400 uppercase tracking-widest bg-accent-500/10 px-4 py-1.5 rounded-full border border-accent-500/20">
                  Uploads
                </span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="rounded-2xl bg-brand-500/5 border border-brand-500/20 p-4 mb-6 flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="text-brand-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-300">
                    File requirements
                  </p>
                  <p className="text-xs text-brand-400/80 mt-1">
                    Please ensure documents are well-lit, not blurry, and text
                    is clearly readable. Max file size: 5MB per document.
                  </p>
                </div>
              </div>

              {!widgetReady && (
                <p className="mb-4 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin inline-block" />
                  Loading secure upload module...
                </p>
              )}
              {!cloudName || !cloudApiKey || !uploadPreset ? (
                <p className="mb-4 text-xs text-rose-400 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                  Document upload is temporarily unavailable. Please try again
                  later.
                </p>
              ) : null}
            </div>

            {uploadFields.map((field) => (
              <div
                key={field.key}
                className={`rounded-2xl border transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${uploads[field.key] ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/10 bg-black/20 hover:border-white/20"}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-12 w-12 rounded-full grid place-items-center flex-shrink-0 ${uploads[field.key] ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"}`}
                  >
                    {uploads[field.key] ? (
                      <CheckCircle size={24} />
                    ) : (
                      <UploadCloud size={24} />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${uploads[field.key] ? "text-emerald-400" : "text-white"}`}
                    >
                      {field.label}
                    </h4>
                    {uploads[field.key]?.originalFilename ? (
                      <p className="text-xs text-emerald-400/80 mt-1 font-medium truncate max-w-[200px] sm:max-w-[250px]">
                        {uploads[field.key].originalFilename}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                        Required image (.jpg, .png)
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openUploadWidget(field.key, field.label)}
                  disabled={uploading[field.key] || widgetUnavailable}
                  className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    uploads[field.key]
                      ? "border-emerald-500/30 bg-transparent text-emerald-400 hover:bg-emerald-500/10"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  {uploading[field.key]
                    ? "Uploading..."
                    : uploads[field.key]
                      ? "Replace File"
                      : "Upload Document"}
                </button>
              </div>
            ))}

            <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-transparent text-white px-6 py-4 text-base font-bold hover:bg-white/5 hover:border-white/20 transition-all text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || Object.values(uploading).some(Boolean)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 text-slate-950 px-8 py-4 text-base font-extrabold transition-all hover:bg-brand-400 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                {loading ? "Submitting Application..." : "Submit Application"}
                {!loading && (
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
