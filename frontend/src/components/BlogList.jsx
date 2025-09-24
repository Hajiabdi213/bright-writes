import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

function BlogList() {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // filter function
  const filteredBlogs = () => {
    if (!blogs) return [];

    return blogs
      .filter((blog) => blog.isPublished) // ✅ Only published blogs
      .filter((blog) => {
        const title = blog.title?.toLowerCase() || "";
        const category = blog.category?.toLowerCase() || "";
        const search = input.toLowerCase();

        return title.includes(search) || category.includes(search);
      });
  };

  return (
    <div className="my-16">
      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8 mb-12 px-4">
        {blogCategories.map((item) => (
          <motion.div
            key={item}
            className="relative"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer px-4 sm:px-6 py-2 text-sm sm:text-base font-medium rounded-full border transition-all duration-300 ${
                menu === item
                  ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-md"
                  : "text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600"
              }`}
            >
              {item}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4 sm:px-8 xl:px-32">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

export default BlogList;
