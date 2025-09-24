import React from 'react'

function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 my-24 px-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
        Never miss a <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">Blog!</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600/90 max-w-xl">
        Subscribe to get the latest blogs, new tech updates, and exclusive news.
      </p>

      {/* Form */}
      <form className="flex flex-col sm:flex-row items-center justify-between max-w-2xl w-full mt-6">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="border border-green-400 h-12 w-full sm:flex-1 rounded-md sm:rounded-l-md sm:rounded-r-none px-4 outline-none text-gray-700 placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-500 transition"
        />
        <button
          type="submit"
          className="mt-3 sm:mt-0 sm:ml-0 h-12 px-6 sm:px-10 md:px-12 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-md sm:rounded-l-none sm:rounded-r-md hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
