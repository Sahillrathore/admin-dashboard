// src/pages/AddSpecialCoupon.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";

const Toast = ({ open, type, message }) => {
    if (!open) return null;

    const color =
        type === "success"
            ? "bg-emerald-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-zinc-800";

    return (
        <div className="fixed top-4 right-4 z-50">
            <div
                className={`${color} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[220px]`}
            >
                <span className="text-lg">
                    {type === "success" ? "✅" : type === "error" ? "⚠️" : "ℹ️"}
                </span>
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
};

const LoadingSpinner = () => (
    <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
);

const AddSpecialCoupon = () => {
    const [product, setProduct] = useState("");
    const [productPct, setProductPct] = useState("");
    const [doctor, setDoctor] = useState("");
    const [doctorPct, setDoctorPct] = useState("");

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        type: "success",
        message: "",
    });

    const showToast = (message, type = "success") => {
        setToast({ open: true, type, message });
        setTimeout(() => {
            setToast((t) => ({ ...t, open: false }));
        }, 2500);
    };

    const handleAdd = (e) => {
        e.preventDefault();

        if (!product || !productPct || !doctor || !doctorPct) {
            showToast("Please fill all required fields.", "error");
            return;
        }

        setLoading(true);

        // simulate API call
        setTimeout(() => {
            setLoading(false);
            showToast("Special commission added successfully.", "success");
            // reset form (optional)
            setProduct("");
            setProductPct("");
            setDoctor("");
            setDoctorPct("");
        }, 1200);
    };

    return (
        <div className="px-7 py-0 space-y-6 w-full min-h-full">
            <Toast open={toast.open} type={toast.type} message={toast.message} />

            {/* Breadcrumbs */}

            <BreadCrumb
                items={[
                    { label: "Affiliate", path: "/affiliate/dashboard" },
                    { label: "Coupon", path: "/affiliate/coupons" },
                    { label: "Special Coupon" }, // last one (no link)
                ]}
            />

            {/* <div className="flex items-center gap-2 text-sm text-zinc-500">
        <NavLink
          to="/affiliate/dashboard"
          className="hover:text-emerald-600 transition-colors"
        >
          Affiliate
        </NavLink>
        <span className="text-zinc-400">{">"}</span>
        <NavLink
          to="/affiliate/commission"
          className="hover:text-emerald-600 transition-colors"
        >
          Commission
        </NavLink>
        <span className="text-zinc-400">{">"}</span>
        <span className="font-medium text-emerald-600">
          Special Commission
        </span>
      </div> */}

            {/* Title */}
            <h1 className="text-lg mb-3 font-semibold text-zinc-800">
                Add Special Commission
            </h1>

            {/* Card */}
            <form
                onSubmit={handleAdd}
                className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-6"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Product */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Product <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            >
                                <option value="">Please Select a Product</option>
                                <option value="Nari Sondarya Malt">Nari Sondarya Malt</option>
                                <option value="Bhringraj Hair Therapy">
                                    Bhringraj Hair Therapy
                                </option>
                                <option value="Lozenge Malt">Lozenge Malt</option>
                            </select>

                        </div>
                    </div>

                    {/* Product Percentage */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Percentage <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={productPct}
                                onChange={(e) => setProductPct(e.target.value)}
                                placeholder="Please select a Percentage"
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>
                    </div>

                    {/* Doctor */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Doctor <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            >
                                <option value="">Please select a Doctor</option>
                                <option value="Alina Mathew">Alina Mathew</option>
                                <option value="Jack Rock">Jack Rock</option>
                                <option value="Dr. Sapna">Dr. Sapna</option>
                            </select>

                        </div>
                    </div>

                    {/* Doctor Percentage */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Percentage <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={doctorPct}
                                onChange={(e) => setDoctorPct(e.target.value)}
                                placeholder="Please select a Percentage"
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Button row */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-10 py-2.5 rounded-xl text-sm font-medium text-white bg-[#28643B] shadow-sm hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {loading && <LoadingSpinner />}
                        <span>{loading ? "Adding..." : "Add"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSpecialCoupon;