import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function Comments() {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const toggleStatus = async (id, isApproved) => {
    try {
      const route = isApproved
        ? "/api/admin/delete-comment"
        : "/api/admin/approve-comment";

      const { data } = await axios.post(route, { id });
      if (data.success) {
        Swal.fire("Success", data.message, "success");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post("/api/admin/delete-comment", { id });
      if (data.success) {
        Swal.fire("Deleted!", data.message, "success");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredComments =
    filter === "All"
      ? comments
      : comments.filter((c) =>
          filter === "Approved" ? c.isApproved : !c.isApproved
        );

  return (
    <div className="flex-1 pt-6 px-5 sm:pt-12 sm:pl-16 bg-green-50/40 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center max-w-5xl mb-6 gap-4">
        <h1 className="text-2xl font-extrabold text-gray-800">Comments</h1>
        <div className="flex gap-2 sm:gap-3">
          {["All", "Approved", "Not Approved"].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === btn
                  ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Comments Table */}
      <div className="relative max-w-5xl overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs uppercase bg-green-100/60 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Blog Title & Comment</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((c, idx) => (
              <tr
                key={c._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition`}
              >
                <td className="px-4 py-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Blog: {c.blog?.title || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-700">Name: {c.name}</p>
                  <p className="text-sm text-gray-700">Comment: {c.content}</p>
                </td>
                <td className="px-4 py-4 text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => toggleStatus(c._id, c.isApproved)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-300 ${
                      c.isApproved
                        ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                        : "bg-red-100 text-red-600 border border-red-300 hover:bg-red-200"
                    }`}
                  >
                    {c.isApproved ? "Approved" : "Not Approved"}
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 shadow-sm transition-all duration-300"
                  >
                    <FaTrash size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredComments.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comments;
