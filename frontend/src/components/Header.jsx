import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  // Marka la search gareeyo
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
    console.log("Searching for:", inputRef.current.value);
  };

  // Marka la clear gareeyo
  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-4 sm:mx-12 md:mx-20 lg:mx-24 relative pt-32 sm:pt-40">
      <div className="text-center mb-8">
        {/* Tagline */}
        <div
          className="inline-flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-1.5
          mb-4 border border-green-500/40 bg-green-100/30 rounded-full 
          text-xs sm:text-sm text-green-700 font-medium"
        >
          <p>Your own blogging platform</p>
          <img src={assets.star_icon} className="w-2 sm:w-2.5" alt="star" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight text-gray-800">
          Your own{" "}
          <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            blogging
          </span>{" "}
          <br className="hidden sm:block" />
          platform
        </h1>

        {/* Description */}
        <p className="my-4 sm:my-6 md:my-8 max-w-xl sm:max-w-2xl m-auto text-xs sm:text-sm md:text-base text-gray-600 px-2">
          Your place to speak freely, share what matters, and write without
          limits. Whether it’s one word or a thousand, your story begins here.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between items-center max-w-xs sm:max-w-md md:max-w-lg 
          max-sm:scale-90 mx-auto border border-green-400 bg-white/90 rounded-lg 
          overflow-hidden shadow-lg"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            className="w-full pl-3 sm:pl-4 text-xs sm:text-sm md:text-base 
            outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 
            text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 font-semibold 
            hover:scale-105 hover:shadow-md transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Clear Search Button (only shows if input != "") */}
        {input && (
          <button
            onClick={onClear}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow 
            hover:bg-gray-300 transition-all duration-300"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Gradient background effect */}
      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute -top-32 sm:-top-40 z-[-1] opacity-60 w-full"
      />
    </div>
  );
}

export default Header;
