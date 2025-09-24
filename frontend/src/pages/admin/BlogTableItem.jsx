import React from "react";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";

const BlogTableItem = ({ blog, index, onPublish, onDelete }) => {
  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed && typeof onDelete === "function") {
        onDelete(blog._id);
      }
    });
  };

  return (
    <tr className="border-y border-gray-200 hover:bg-green-50 transition-colors duration-300">
      <th className="px-2 py-4 text-gray-700 font-medium">{index}</th>
      <td className="px-2 py-4 font-semibold text-gray-900">{blog.title}</td>
      <td className="px-2 py-4 max-sm:hidden text-gray-600 text-sm">
        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Invalid Date"}
      </td>
      <td className="px-2 py-4 max-sm:hidden">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
            blog.isPublished
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-600 border border-red-300"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-2 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => typeof onPublish === "function" && onPublish(blog._id, !blog.isPublished)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 shadow-sm ${
              blog.isPublished
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-gradient-to-r from-green-500 to-green-700 text-white hover:opacity-90"
            }`}
          >
            {blog.isPublished ? "Unpublish" : "Publish"}
          </button>

          <button
            onClick={handleDeleteClick}
            className="p-1.5 rounded-lg hover:bg-red-100 transition-all duration-300 shadow-sm"
          >
            <TrashIcon className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableItem;
