import React from 'react'

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
                <span className="text-lg">✅</span>
                <p className="text-sm font-medium">{message}</p>
            </div>
        </div>
    );
};

export default Toast