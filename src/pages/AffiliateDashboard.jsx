import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";

const FILTERS = ["today", "week", "month", "custom"];

const FILTER_LABELS = {
  today: "Today So Far",
  week: "Week So Far",
  month: "Month So Far",
  custom: "Custom",
};

const METRICS_BY_FILTER = {
  today: { coupons: 18, orders: 4, revenue: 420, doctors: 2, suffix: "/today" },
  week: { coupons: 120, orders: 32, revenue: 2540, doctors: 4, suffix: "/week" },
  month: { coupons: 255, orders: 55, revenue: 5540, doctors: 5, suffix: "/month" },
  custom: { coupons: 160, orders: 40, revenue: 4320, doctors: 3, suffix: "/range" },
};

const METRIC_CARDS = [
  { title: "Total Coupons clicks", key: "coupons", icon: "/calendar.svg.png" },
  { title: "Total Orders", key: "orders", icon: "/refund-icon.png" },
  {
    title: "Total Revenue",
    key: "revenue",
    icon: "/empty-wallet.svg.png",
    format: (v) => v.toLocaleString(),
  },
  { title: "Total Doctors", key: "doctors", icon: "/profile-add.svg.png" },
];

const AffiliateDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("month");
  const metrics = METRICS_BY_FILTER[activeFilter];

  return (
    <div className="px-4 md:px-7 py-0 space-y-6 w-full min-h-full">

      {/* Breadcrumbs */}
      <BreadCrumb
        items={[
          { label: "Affiliate", path: "/affiliate/dashboard" },
          { label: "Dashboard" },
        ]}
      />

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-zinc-100 px-2 md:px-4 py-2 md:py-3">
        <div className="flex items-center justify-around gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((key) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className="flex-shrink-0 px-2 md:px-4 py-2 text-sm font-medium"
              >
                <p
                  className={`pb-1 w-fit ${
                    isActive
                      ? "text-[#457246] border-b-2 border-[#457246]"
                      : "text-zinc-500"
                  }`}
                >
                  {FILTER_LABELS[key]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRIC_CARDS.map((card) => {
          const value = card.format
            ? card.format(metrics[card.key])
            : metrics[card.key];

          return (
            <div
              key={card.key}
              className="bg-white rounded-2xl border border-zinc-200 p-4 flex flex-col gap-3"
            >
              <p className="text-sm md:text-lg font-semibold text-zinc-700">
                {card.title}
              </p>

              <div className="flex items-center gap-4 md:gap-5 mb-4">
                <div className="h-12 w-12 rounded-2xl border border-zinc-200 bg-[#FDF8E5] flex items-center justify-center">
                  <img src={card.icon} alt="" />
                </div>

                <div className="flex items-end gap-1">
                  <span className="text-2xl md:text-3xl font-bold text-[#3A643B]">
                    {value}
                  </span>
                  <span className="text-xs text-zinc-400">{metrics.suffix}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-10 lg:gap-16 md:grid-cols-2">

        {/* Top Doctors */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-800 mb-4 md:mb-5">
            Top Affiliate Doctors
          </h2>

          <div className="space-y-2 p-4 px-2 border border-zinc-200 rounded-2xl bg-white">
            {[1, 2, 3].map((num, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-600 w-4">{num}.</span>
                  <img
                    src="/avatar3.png"
                    alt=""
                    className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-zinc-800">
                      {num === 1 ? "Dr. Meenal" : num === 2 ? "Dr. Pallav" : "Dr. Sapna"}
                    </p>
                    <p className="text-xs text-zinc-500">Gynecology + 2 others</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${
                    num === 3
                      ? "bg-red-200 text-red-500"
                      : "bg-emerald-200 text-emerald-600"
                  }`}
                >
                  {num === 3 ? "↓ -2%" : num === 1 ? "↑ +8%" : "↑ +1%"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-800 mb-4 md:mb-5">
            Top Affiliate Products
          </h2>

          <div className="space-y-2 p-4 px-2 border border-zinc-200 rounded-2xl bg-white">
            {[1, 2, 3].map((num, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-600 w-4">{num}.</span>
                  <img
                    src="/link-icon.png"
                    alt=""
                    className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
                  />
                  <p className="text-sm text-zinc-800 truncate">
                    {num === 1
                      ? "Amrutam Nari Sondarya Malt"
                      : num === 2
                      ? "Amrutam Bhringraj Hair Therapy"
                      : "Amrutam Lozenge Malt"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AffiliateDashboard;
