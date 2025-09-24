import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const { _id, title, description, category, image } = blog;
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/blog/${_id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image */}
      <div className="overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover transform hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white text-xs font-medium rounded-full mb-3">
          {category}
        </span>

        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
          {title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3">
          {(description || "").replace(/<[^>]+>/g, "")}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
