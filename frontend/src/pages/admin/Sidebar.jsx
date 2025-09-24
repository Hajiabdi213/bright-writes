import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300
     ${isActive
       ? "bg-green-100 border-r-4 border-green-600 text-green-700 font-semibold"
       : "text-gray-700 hover:bg-green-50 hover:text-green-600"}`;

  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6 bg-white shadow-sm">
      {/* Dashboard */}
      <NavLink end to="/admin/dashboard" className={linkClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 
            1.591 0L21.75 12M4.5 9.75v10.125c0 
            .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 
            1.125-1.125h2.25c.621 0 1.125.504 
            1.125 1.125V21h4.125c.621 0 1.125-.504 
            1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink to="/admin/add-blog" className={linkClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 
            0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>

      {/* Blog List */}
      <NavLink to="/admin/list-blog" className={linkClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 
            5.25h16.5"
          />
        </svg>
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>

      {/* Comments */}
      <NavLink to="/admin/comments" className={linkClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3.75h6m-9 
            5.625V18A2.25 2.25 0 0 1 6.75 
            15.75h10.5A2.25 2.25 0 0 1 
            19.5 18v1.875a2.25 2.25 0 0 1-2.25 
            2.25H6.75a2.25 2.25 0 0 1-2.25-2.25Z"
          />
        </svg>
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
