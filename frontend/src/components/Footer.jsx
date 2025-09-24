import React from "react";
import { assets, footer_data } from "../assets/assets";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white mt-20">
      {/* Top Section */}
      <div className="px-6 md:px-16 lg:px-24 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Left Section (Logo + Description) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={assets.logo}
              alt="BrightWrites Logo"
              className="w-10 sm:w-12"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide">
              BrightWrites
            </span>
          </div>
          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
            Your trusted place to share, connect, and express freely. 
            BrightWrites helps you write your story without limits.
          </p>
        </div>

        {/* Dynamic Footer Links */}
        {footer_data.map((section, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-lime-200 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Copyright */}
      <p className="py-4 text-center text-xs sm:text-sm md:text-base text-white/80 border-t border-white/20">
        © 2025 BrightWrites — All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
