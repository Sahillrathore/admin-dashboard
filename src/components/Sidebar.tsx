// Sidebar.jsx
import React, { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const MENU = [
  {
    section: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "/dashboard.png", path: "/" },
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
          { name: "Web", path: "/customization/faq" },
          { name: "App", path: "/customization/faq" },
        ],
      },

      { id: "referral", label: "Referral", icon: "/patients.png", path: "/" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { openItemId, setOpenItemId, collapsed, setCollapsed } = useSidebar();

  /** Auto-open the parent if any child route is active */
  useEffect(() => {
    MENU.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children) {
          if (
            item.children.some((child) =>
              location.pathname.startsWith(child.path)
            )
          ) {
            setOpenItemId(item.id);
          }
        }
      });
    });
  }, [location.pathname, setOpenItemId]);

  /** Click on a parent item (with submenu) */
  const handleMenuClick = (item) => {
    // If desktop & collapsed (icon-only) → expand sidebar first
    if (typeof window !== "undefined" && window.innerWidth >= 768 && collapsed) {
      setCollapsed(false);
      setOpenItemId(item.id);
      return;
    }

    if (item.children) {
      setOpenItemId((prev) => (prev === item.id ? null : item.id));
    }
  };

  /** When clicking a NavLink, handle mobile/desktop behavior */
  const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // on mobile → close overlay
      setCollapsed(true);
    } else if (collapsed) {
      // on desktop when in icon-only mode → expand
      setCollapsed(false);
    }
  };

  // Sidebar base classes
  const baseClasses =
    "bg-white rounded-tr-4xl shadow-[0_0_40px_rgba(15,23,42,0.08)] p-2 overflow-y-auto transition-all duration-300";

  // Mobile: overlay drawer; Desktop: static sidebar
  const positionClasses =
    "fixed inset-y-0 left-0 z-40 transform md:static md:translate-x-0";

  // Mobile translate / width
  const mobileStateClasses = collapsed
    ? "-translate-x-full w-64" // hidden
    : "translate-x-0 w-64"; // visible drawer

  // Desktop width for collapsed/expanded
  const desktopWidthClasses = collapsed ? "md:w-20" : "md:w-68";

  return (
    <>
      {/* Backdrop overlay (mobile only) */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`${baseClasses} ${positionClasses} ${mobileStateClasses} md:h-full ${desktopWidthClasses}`}
      >
        {MENU.map((section) => (
          <div key={section.section} className="mb-8">
            {/* Section Title – hidden when collapsed on desktop */}
            {!collapsed && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-700 mb-4">
                {section.section}
              </p>
            )}

            <nav className="space-y-1">
              {section.items.map((item) => {
                const isOpen = openItemId === item.id;

                const IconAndLabel = (
                  <>
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                      <img src={item.icon} alt="" />
                    </div>

                    {/* Hide label when collapsed (desktop) */}
                    {!collapsed && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}
                  </>
                );

                return (
                  <div key={item.id}>
                    {/* ITEM WITHOUT CHILDREN */}
                    {!item.children ? (
                      <NavLink
                        to={item.path}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold 
                          transition-colors ${collapsed ? "justify-center" : ""}
                          ${
                            isActive
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-zinc-500 hover:bg-zinc-50"
                          }`
                        }
                      >
                        {IconAndLabel}
                      </NavLink>
                    ) : (
                      <>
                        {/* ITEM WITH SUBMENU */}
                        <button
                          type="button"
                          onClick={() => handleMenuClick(item)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 
                          text-sm font-semibold transition-colors 
                          ${collapsed ? "justify-center" : ""}
                          ${
                            isOpen
                              ? "text-emerald-600 bg-emerald-0"
                              : "text-zinc-500 hover:bg-zinc-50"
                          }`}
                        >
                          {IconAndLabel}

                          {/* Chevron only when expanded (not collapsed on desktop) */}
                          {!collapsed && (
                            <span
                              className={`text-xs transition-transform ${
                                isOpen ? "rotate-0" : "-rotate-90"
                              }`}
                            >
                              <FaAngleDown size={17} />
                            </span>
                          )}
                        </button>

                        {/* DROPDOWN – hidden when collapsed */}
                        {!collapsed && item.children && (
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out
                            ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                          >
                            <div className="overflow-hidden pl-16 pr-3">
                              <ul className="flex flex-col gap-2 py-2 text-sm">
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <NavLink
                                      to={child.path}
                                      onClick={handleNavClick}
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
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
