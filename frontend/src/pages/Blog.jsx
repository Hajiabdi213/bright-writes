import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import moment from "moment";
import { FaFacebookF, FaTwitter, FaInstagram, FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // ✅ Fetch single blog
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blogs/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/blogs/${id}/comments`);
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
    fetchBlogData();
    fetchComments();
  }, [id]);

  // 🚫 Haddii blog unpublish yahay → tus fariin
  if (data && !data.isPublished) {
    return (
      <div className="pt-24 text-center text-red-600 font-bold">
        🚫 This blog is not available.
      </div>
    );
  }

  // ✅ Handle new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    try {
      const { data } = await axios.post("/api/blogs/add-comment", {
        blog: id,
        name,
        content: comment,
      });

      if (data.success) {
        fetchComments();
        setName("");
        setComment("");
        toast.success("Comment added for review");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return data ? (
    <>
      {/* Back Button */}
      <div className="pt-24 max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md font-medium shadow hover:scale-105 transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Blog Header */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Published on {moment(data.createdAt).format("MMMM Do, YYYY")}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          {data.title}
        </h1>
        <p className="text-gray-600 mb-4">{data.subtitle || data.title}</p>
        <button className="px-4 py-1 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full text-sm font-medium shadow hover:scale-105 transition">
          {data.author || "Anonymous"}
        </button>
      </div>

      {/* Blog Image */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <img
          src={data.image}
          alt={data.title}
          className="w-full rounded-xl mb-6 aspect-video object-cover shadow-md"
        />
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div
          className="prose max-w-none text-gray-700 mb-12"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comments Section */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-6 border-b pb-2">
            Comments ({comments.length})
          </h2>

          <div className="space-y-4 mb-8">
            {comments.map((item) => (
              <div
                key={item._id}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <FaUserCircle className="text-3xl text-green-600" />
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    {item.name}{" "}
                    <span className="text-xs text-gray-500">
                      • {moment(item.createdAt).fromNow()}
                    </span>
                  </p>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-md shadow hover:scale-105 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Share this article</h2>
          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-blue-600 text-white shadow hover:scale-105 transition">
              <FaFacebookF size={18} />
            </button>
            <button className="p-3 rounded-full bg-sky-400 text-white shadow hover:scale-105 transition">
              <FaTwitter size={18} />
            </button>
            <button className="p-3 rounded-full bg-pink-500 text-white shadow hover:scale-105 transition">
              <FaInstagram size={18} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Blog;
