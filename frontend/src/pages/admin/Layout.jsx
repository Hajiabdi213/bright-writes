import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    // clear storage haddii loo baahdo
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <>
      {/* --- Topbar --- */}
      <div className="flex items-center justify-between py-3 h-[70px] px-4 sm:px-12 border-b border-gray-200 bg-white shadow-sm">
        {/* Logo magac ahaan */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl sm:text-3xl font-extrabold text-gray-800 cursor-pointer tracking-wide hover:text-green-600 transition-colors"
        >
          BrightWrites
        </h1>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="text-sm sm:text-base px-6 sm:px-8 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-medium rounded-full shadow hover:scale-105 hover:shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* --- Main Layout --- */}
      <div className="flex h-[calc(100vh-70px)] bg-green-50/40">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
