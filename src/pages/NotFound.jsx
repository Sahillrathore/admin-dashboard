import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-8">
      <div className="relative max-w-xl w-full">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -top-16 -left-10 h-40 w-40 rounded-full bg-emerald-100 blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-40 w-40 rounded-full bg-amber-100 blur-3xl opacity-70" />

        {/* Card */}
        <div className="relative z-10 bg-white border border-zinc-100 rounded-3xl shadow-[0_18px_40px_rgba(15,23,42,0.08)] px-5 md:px-8 py-8 md:py-10 flex flex-col items-center text-center gap-5">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-[#28643B] border border-emerald-100">
            Oops, page not found
          </span>

          {/* 404 + subtitle */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900">
              404
            </h1>
            <p className="text-base md:text-lg font-semibold text-zinc-800">
              This page walked off to take an ayurvedic break 🚶‍♀️🌿
            </p>
            <p className="text-xs md:text-sm text-zinc-500 max-w-md mx-auto">
              The link you followed might be broken, or the page may have been moved.
              You can go back to your dashboard or explore other sections.
            </p>
          </div>

          {/* Optional “suggested actions” chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <span className="px-3 py-1 rounded-full bg-zinc-100 text-[11px] md:text-xs text-zinc-600">
              Check the URL again
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-100 text-[11px] md:text-xs text-zinc-600">
              Go back to Affiliate Dashboard
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto justify-center">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition"
            >
              ← Go Back
            </button>

            <button
              onClick={() => navigate("/affiliate/dashboard")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#28643B] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Small footer note */}
          <p className="mt-3 text-[11px] md:text-xs text-zinc-400">
            If you believe this is a mistake, please contact the admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
