import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const BreadCrumb = ({ items = [] }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* If path exists → NavLink, otherwise just text */}
            {item.path && !isLast ? (
              <NavLink
                to={item.path}
                className="hover:text-emerald-600 font-medium transition-colors"
              >
                {item.label}
              </NavLink>
            ) : (
              <span className="font-medium text-[#28643B]">{item.label}</span>
            )}

            {/* Arrow except last item */}
            {!isLast && (
              <span className="text-zinc-400">
                <FaAngleRight />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
