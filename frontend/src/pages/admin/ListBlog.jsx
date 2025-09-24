import React, { useEffect, useState } from "react";
import BlogTableItem from "./BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";

function ListBlog() {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs");
      if (data.success) setBlogs(data.blogs);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Publish / Unpublish blog
  const handlePublish = async (id, publishState) => {
    try {
      const { data } = await axios.patch(`/api/blogs/publish/${id}`, { isPublished: publishState });
      if (data.success) {
        Swal.fire("✅ Success", data.message, "success");
        fetchBlogs();
      }
    } catch (error) {
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/blogs/delete/${id}`);
      if (data.success) {
        Swal.fire("Deleted!", data.message, "success");
        fetchBlogs();
      }
    } catch (error) {
      Swal.fire("❌ Error", error.message, "error");
    }
  };

  return (
    <div className="flex-1 pt-6 px-4 bg-green-50/40 min-h-screen">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">All Blogs</h1>
      <div className="relative max-w-5xl overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs uppercase bg-green-100/60 text-gray-700">
            <tr>
              <th className="px-2 py-4">#</th>
              <th className="px-2 py-4">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden">Date</th>
              <th className="px-2 py-4 max-sm:hidden">Status</th>
              <th className="px-2 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index + 1}
                  onPublish={handlePublish}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog;
