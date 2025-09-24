import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-8 md:px-16 xl:px-32 
    bg-gradient-to-r from-green-400 to-green-700 shadow-md fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => navigate("/")}
      >
        <img 
          src={assets.logo} 
          alt="logo" 
          className="w-8 sm:w-9 md:w-10 transition-transform group-hover:scale-110"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-extrabold 
        bg-gradient-to-r from-lime-200 to-white bg-clip-text text-transparent tracking-wide">
          BrightWrites
        </span>
      </div>

      {/* Admin Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 rounded-full text-xs sm:text-sm md:text-base font-semibold 
        bg-gradient-to-r from-emerald-500 to-green-800 text-white 
        px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 shadow-lg 
        hover:scale-105 hover:shadow-xl active:scale-95 
        transition-all duration-300"
      >
        {token ? "Dashboard" : "Admin login"}
        <img src={assets.right_arrow} alt="arrow" className="w-2.5 sm:w-3" />
      </button>
    </div>
  );
};

export default Navbar;
