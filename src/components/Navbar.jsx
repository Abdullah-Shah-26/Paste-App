import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-transparent">
      <ul className="mx-auto max-w-3xl flex items-center justify-center gap-4 py-2.5 px-3
                     rounded-md border border-gray-200 bg-white shadow-sm">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-md transition-colors
               ${isActive
                 ? "bg-sky-100 text-sky-700"
                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-3 py-1.5 text-sm font-medium rounded-md transition-colors
               ${isActive
                 ? "bg-sky-100 text-sky-700"
                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`
            }
          >
            Snippets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}