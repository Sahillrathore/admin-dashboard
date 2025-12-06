import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSidebar } from "../context/SidebarContext";

const Header = () => {
  const { setCollapsed } = useSidebar();

  const handleCollapseToggle = () => setCollapsed((prev) => !prev);

  return (
    <header className="flex items-center justify-between px-3 md:px-5 md:pl-2 bg-white shadow-[0_0_40px_rgba(15,23,42,0.08)] h-[70px]">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* Menu button */}
       

        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* icon always */}
          <img
            src="/logo-icon.png"
            alt="logo"
            className="w-10 h-10 md:w-[67px] md:h-[67px]"
          />
          {/* wordmark hidden on very small screens */}
          <img
            src="/logo.png"
            alt="logo-text"
            className="h-8 w-auto hidden sm:block md:h-[50px] md:w-[163px]"
          />
        </div>

         <button
          onClick={handleCollapseToggle}
          className="flex items-center justify-center mr-1 rounded-md text-[#457246] focus:outline-none md:mr-3"
        >
          <HiMenuAlt3 size={26} className="cursor-pointer" />
        </button>

        {/* Search input – hidden on small screens, visible from md up */}
        <div className="hidden md:flex search-input ml-4 bg-zinc-100 rounded-lg px-3 items-center gap-2 py-2.5">
          <img src="/search-icon.png" alt="" />
          <input
            type="text"
            placeholder="Search here"
            className="border-none bg-transparent outline-none text-sm text-[#3A643B]"
          />
        </div>
      </div>

      {/* RIGHT SIDE – desktop */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-6">
          <img src="/mail-icon.png" alt="mail" />
          <img src="/bell-icon.png" alt="notifications" />
          <div className="flex gap-2 items-center">
            <h4 className="flex flex-col items-end gap-0 text-sm font-bold text-[#457246]">
              <span>Liam Michael</span>
              <span className="opacity-50 font-semibold text-[11px]">
                Admin
              </span>
            </h4>
            <img src="/avatar2.png" className="w-11 h-11 rounded-full" alt="" />
          </div>
        </div>

        <img src="/setting.png" className="w-6 h-6" alt="settings" />
      </div>

      {/* RIGHT SIDE – mobile (just bell + avatar) */}
      <div className="flex md:hidden items-center gap-3">
        <img src="/bell-icon.png" alt="notifications" className="w-5 h-5" />
        <img src="/avatar2.png" className="w-9 h-9 rounded-full" alt="" />
      </div>
    </header>
  );
};

export default Header;
