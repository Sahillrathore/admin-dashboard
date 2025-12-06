// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { BsArrowBarDown, BsArrowDown } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

type Item = {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const MENU = [
  {
    section: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "/dashboard.png" , path: '/'}, // no path → no NavLink
      { id: "doctors", label: "Doctors", icon: "/doctor.png", path: "/" },
      { id: "patients", label: "Patients", icon: "/patients.png", path: "/" },
      { id: "appointments", label: "Appointments", icon: "/appoint.png", path: "/" },
      { id: "speciality", label: "Speciality", icon: "/speciality.png", path: "/" },
      { id: "coupons", label: "Coupons", icon: "/coupon.png", path: "/" },
      { id: "concerns", label: "Concerns", icon: "/concerns.png", path: "/" },
      {
        id: "affiliate",
        label: "Affiliate",
        icon: "/affiliate.png",
        children: [
          { name: "Dashboard", path: "/affiliate/dashboard" },
          { name: "Commission", path: "/affiliate/commission" },
          { name: "Coupons", path: "/affiliate/coupons" },
          { name: "Payment", path: "/affiliate/payments" },
          { name: "Pending Payment", path: "/affiliate/payments" },
          { name: "Sales", path: "/affiliate/commission" },
          { name: "Doctors", path: "/affiliate/coupons" },
        ],
      },
      {
        id: "customization",
        label: "Customization",
        icon: "/affiliate.png",
        children: [
          {name: "Web", path: "/customization/faq"},
          {name: "App", path: "/customization/faq"},
        ]
      },
      { id: "referral", label: "Referral", icon: "/referral.png", path: "/" },
      // { id: "payments", label: "Payments", icon: "/referral.png", path: "/affiliate/payments" },

    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [openItemId, setOpenItemId] = useState(null);

  // open affiliate menu if any of its child routes is active
  useEffect(() => {
    MENU.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          if (
            item.children.some(
              (child) => child.path && location.pathname.startsWith(child.path)
            )
          ) {
            setOpenItemId(item.id);
          }
        }
      });
    });
  }, [location.pathname]);

  const toggleMenu = (item) => {
    if (!item.children) return;
    setOpenItemId(openItemId === item.id ? null : item.id);
  };

  return (
    <aside className="h-full w-68 bg-white rounded-tr-4xl shadow-[0_0_40px_rgba(15,23,42,0.08)] p-2 overflow-y-auto">
      {MENU.map((section) => (
        <div key={section.section} className="mb-8">
          {/* Section Title */}
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-4">
            {section.section}
          </p>

          <nav className="space-y-1">
            {section.items.map((item) => {
              const isOpen = openItemId === item.id;

              // COMMON CONTENT (icon + label)
              const Content = (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                    <img src={item.icon} alt="" />
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                </>
              );

              return (
                <div key={item.id}>
                  {/* NO CHILDREN */}
                  {!item.children ? (
                    item.path ? (
                      // has path → NavLink with active styling
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex w-full items-center font-semibold gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors 
                          ${
                            isActive
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-zinc-500 hover:bg-zinc-50"
                          }`
                        }
                      >
                        {Content}
                      </NavLink>
                    ) : (
                      // NO path → simple non-routing row
                      <div className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-zinc-600">
                        {Content}
                      </div>
                    )
                  ) : (
                    <>
                      {/* ITEM WITH SUBMENU (Affiliate) */}
                      <button
                        type="button"
                        onClick={() => toggleMenu(item)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors font-semibold
                          ${
                            isOpen
                              ? "text-emerald-600 bg-emerald-0"
                              : "text-zinc-500 hover:bg-zinc-50"
                          }`}
                      >
                        {Content}
                        <span
                          className={`text-xs transition-transform ${
                            isOpen ? "rotate-0" : "-rotate-90"
                          }`}
                        >
                          <FaAngleDown size={17}/>
                        </span>
                      </button>

                      {/* SUBMENU */}
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out 
                          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      >
                        <div className="overflow-hidden pl-16 pr-3">
                          <ul className="flex flex-col gap-1.5 py-2 text-sm">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <NavLink
                                  to={child.path}
                                  className={({ isActive }) =>
                                    `block py-1 transition-colors 
                                    ${
                                      isActive
                                        ? "text-emerald-700 font-medium"
                                        : "text-zinc-500 hover:text-emerald-700"
                                    }`
                                  }
                                >
                                  {child.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
