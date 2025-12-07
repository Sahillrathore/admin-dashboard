// src/pages/AffiliateCoupons.jsx
import React, { useMemo, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { IoReload } from "react-icons/io5";
import { PiPlusBold } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

/* ---------- Demo Data ---------- */

const SPECIAL_COMMISSION_ROWS = [
    {
        id: 1,
        doctorName: "Alina Mathew",
        doctorCommission: "1",
        productName: "Nari Sondarya Malt",
        productCommission: "30%",
        avatar: "/avatar.jpg",
    },
    {
        id: 2,
        doctorName: "Jack Rock",
        doctorCommission: "10",
        productName: "Nari Sondarya Malt",
        productCommission: "30%",
        avatar: "/avatar2.png",
    },
    {
        id: 3,
        doctorName: "Alina Mathew",
        doctorCommission: "4",
        productName: "Nari Sondarya Malt",
        productCommission: "30%",
        avatar: "/avatar3.png",
    },
    {
        id: 4,
        doctorName: "Alina Mathew",
        doctorCommission: "20",
        productName: "Nari Sondarya Malt",
        productCommission: "30%",
        avatar: "/avatar.jpg",
    },
    {
        id: 5,
        doctorName: "Jack Rock",
        doctorCommission: "6",
        productName: "Nari Sondarya Malt",
        productCommission: "30%",
        avatar: "/avatar2.png",
    },
];

/* ---------- Small Reusable Components ---------- */

const ToggleSwitch = ({ enabled, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition
    ${enabled ? "bg-emerald-500" : "bg-zinc-300"}`}
    >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform
      ${enabled ? "translate-x-5" : "translate-x-1"}`}
        />
    </button>
);

const LoadingSpinner = () => (
    <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
);



/* ---------- Main Page ---------- */

const AffiliateCoupons = () => {
    // default commission sections
    const [productEnabled, setProductEnabled] = useState(true);
    const [doctorEnabled, setDoctorEnabled] = useState(true);

    const [defaultProduct, setDefaultProduct] = useState("All Products");
    const [defaultProductPct, setDefaultProductPct] = useState("");

    const [defaultDoctor, setDefaultDoctor] = useState("All Doctors");
    const [defaultDoctorPct, setDefaultDoctorPct] = useState("");

    // loading
    const [updatingProduct, setUpdatingProduct] = useState(false);
    const [updatingDoctor, setUpdatingDoctor] = useState(false);

    // toast
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

    // table + search
    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return SPECIAL_COMMISSION_ROWS;
        return SPECIAL_COMMISSION_ROWS.filter(
            (row) =>
                row.doctorName.toLowerCase().includes(q) ||
                row.productName.toLowerCase().includes(q)
        );
    }, [search]);

    const handleExport = () => {
        const header = [
            "Doctor Name",
            "Doctor's Commission",
            "Product Name",
            "Product's Commission",
        ];
        const rows = filteredRows.map((row) => [
            row.doctorName,
            row.doctorCommission,
            row.productName,
            row.productCommission,
        ]);

        const csvContent =
            [header, ...rows].map((r) => r.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "special_commission.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const simulateUpdate = async (type) => {
        if (type === "product") {
            setUpdatingProduct(true);
            setTimeout(() => {
                setUpdatingProduct(false);
                showToast("Default product commission updated.");
            }, 1200);
        } else {
            setUpdatingDoctor(true);
            setTimeout(() => {
                setUpdatingDoctor(false);
                showToast("Default doctor commission updated.");
            }, 1200);
        }
    };

    return (
        <div className="px-7 space-y-6 py-0  min-h-full w-full">
            <Toast open={toast.open} type={toast.type} message={toast.message} />

            {/* Breadcrumbs */}
            <BreadCrumb
                items={[
                    { label: "Affiliate", path: "/affiliate/dashboard" },
                    { label: "Coupons" },
                ]}
            />

            {/* Header button */}
            <div className="flex justify-end">
                <Link to='/affiliate/commission/special-coupon' className="px-4 py-2 rounded-xl bg-[#28643B] text-white text-sm font-medium shadow-sm hover:bg-emerald-700 transition">
                    Add Special Coupon
                </Link>
            </div>

            {/* Default Product Commission */}
            <div className="flex mb-3 justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">
                    Default Coupon
                </h2>
                <div className="flex items-center justify-between">
                    <ToggleSwitch enabled={productEnabled} onChange={setProductEnabled} />
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-4">

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Product select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">Doctor Name</label>
                        <div className="relative">
                            <select
                                disabled={!productEnabled}
                                value={defaultProduct}
                                onChange={(e) => setDefaultProduct(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                            >
                                <option>All Products</option>
                                <option>Nari Sondarya Malt</option>
                                <option>Bhringraj Hair Therapy</option>
                                <option>Lozenge Malt</option>
                            </select>
                            {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                                ▼
                            </span> */}
                        </div>
                        {/* <span className="text-[11px] text-zinc-400">
                            Applies to all the products
                        </span> */}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Usage Limit <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            disabled={!productEnabled}
                            value={defaultProductPct}
                            onChange={(e) => setDefaultProductPct(e.target.value)}
                            placeholder="Please select limit"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                        />
                    </div>

                    {/* Percentage input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Percentage <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            disabled={!productEnabled}
                            value={defaultProductPct}
                            onChange={(e) => setDefaultProductPct(e.target.value)}
                            placeholder="Please select a Percentage"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        disabled={updatingProduct || !productEnabled}
                        onClick={() => simulateUpdate("product")}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-white bg-[#28643B] shadow-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {updatingProduct && <LoadingSpinner />}
                        <span>{updatingProduct ? "Updating..." : "Update"}</span>
                    </button>
                </div>
            </div>

            {/* Default Doctor Commission */}
            <div className="flex items-center mb-3 justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">
                    Default Cart Discount
                </h2>
                <ToggleSwitch enabled={doctorEnabled} onChange={setDoctorEnabled} />
            </div>
            <div className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-4">

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">Product Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select
                                disabled={!productEnabled}
                                value={defaultProduct}
                                onChange={(e) => setDefaultProduct(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                            >
                                <option>All Products</option>
                                <option>Nari Sondarya Malt</option>
                                <option>Bhringraj Hair Therapy</option>
                                <option>Lozenge Malt</option>
                            </select>
                            {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                                ▼
                            </span> */}
                        </div>
                        {/* <span className="text-[11px] text-zinc-400">
                            Applies to all the products
                        </span> */}
                    </div>

                    {/* Doctor select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">Doctor Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <select
                                disabled={!doctorEnabled}
                                value={defaultDoctor}
                                onChange={(e) => setDefaultDoctor(e.target.value)}
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                            >
                                <option>All Doctors</option>
                                <option>Alina Mathew</option>
                                <option>Jack Rock</option>
                                <option>Dr. Sapna</option>
                            </select>
                            {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                                ▼
                            </span> */}
                        </div>

                    </div>

                    {/* Percentage input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Usage Limit <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            disabled={!doctorEnabled}
                            value={defaultDoctorPct}
                            onChange={(e) => setDefaultDoctorPct(e.target.value)}
                            placeholder="Please select limit"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                        />
                    </div>
                    {/* Percentage input */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-zinc-500 mb-1">
                            Discount <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            disabled={!doctorEnabled}
                            value={defaultDoctorPct}
                            onChange={(e) => setDefaultDoctorPct(e.target.value)}
                            placeholder="Please select discount"
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        disabled={updatingDoctor || !doctorEnabled}
                        onClick={() => simulateUpdate("doctor")}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-white bg-[#28643B] shadow-sm hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                        {updatingDoctor && <LoadingSpinner />}
                        <span>{updatingDoctor ? "Updating..." : "Update"}</span>
                    </button>
                </div>
            </div>

            {/* Special Commission Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 p-5 space-y-4">
                {/* Header row with search + actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <h2 className="text-lg font-semibold text-zinc-800">
                            Special Coupons
                        </h2>
                        {/* Search */}
                        <div className="flex-1 md:w-72 relative">
                            <div className='search-input ml-3 bg-zinc-100 mx-4 rounded-lg px-3 flex gap-2 py-2'>
                                <img src="/search-icon.png" alt="" />
                                <input type="text" placeholder='Search here' className='border-none outline-none text-sm text-[#3A643B]' />
                            </div>
                        </div>

                        {/* Add (dummy) */}
                        <button className="h-8 w-8 rounded-lg font-bold bg-zinc-100 text-[#28643B] text-xl flex items-center justify-center shadow-sm">
                            <PiPlusBold />
                        </button>

                        {/* Refresh (just clears search) */}
                        <button
                            onClick={() => setSearch("")}
                            className="h-8 w-8 rounded-lg ml-3 shadow-sm font-bold border-zinc-300 bg-zinc-100 text-[#28643B] text-base flex items-center justify-center"
                            title="Reset"
                        >
                            <IoReload />
                        </button>

                    </div>
                    {/* Export */}
                    <button
                        onClick={handleExport}
                        className="h-8 w-8 rounded-lg text-[#28643B] bg-zinc-100 text-xs flex items-center justify-center"
                        title="Export CSV"
                    >
                        <FaDownload />
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-zinc-100">
                    <table className="min-w-full text-sm overflow-x-scroll">
                        <thead className="bg-zinc-50 text-xs text-zinc-500">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Doctor Name
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Product Name
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Usage Limit
                                </th>
                                <th className="px-4 py-3 text-left font-medium">
                                    Percentage
                                </th>
                                <th className="px-4 py-3 text-left font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {filteredRows.map((row) => (
                                <tr key={row.id} className="hover:bg-zinc-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={row.avatar}
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-zinc-800">{row.doctorName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.productName}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.doctorCommission}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        {row.productCommission}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700">
                                        <button className="text-xs text-emerald-600 hover:underline">
                                            <img src="/Vector.png" alt="" />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredRows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-xs text-zinc-400"
                                    >
                                        No data found for this search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer (rows per page / pagination dummy) */}
                <div className="flex items-center justify-between text-xs text-zinc-500 pt-3">
                    <span>Rows per page: 5</span>
                    <div className="flex items-center gap-2">
                        <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                            {"<"}
                        </button>
                        <span>1</span>
                        <button className="h-7 w-7 rounded-lg border border-zinc-300 flex items-center justify-center">
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateCoupons;
