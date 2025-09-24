import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { marked } from "marked";

function AddBlog() {
  const { axios, fetchBlogs } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // ✨ Generate content with AI
  const generateContent = async () => {
    if (!title) return toast.error("⚠️ Please enter a title first!");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blogs/generate", { prompt: title });

      if (data.success) {
        const htmlContent = marked(data.content);
        if (quillRef.current) {
          quillRef.current.clipboard.dangerouslyPasteHTML(htmlContent);
        }
        setDescription(htmlContent);
        toast.success("✨ AI content generated!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !description || !category) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Missing fields",
        text: "Please fill all required fields!",
      });
      return;
    }

    try {
      setIsAdding(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subTitle);
      formData.append("description", quillRef.current.root.innerHTML);
      formData.append("category", category);
      formData.append("isPublished", isPublished);
      formData.append("image", image);

      const { data } = await axios.post("/api/blogs/add", formData);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "✅ Success!",
          text: data.message || "Blog added successfully!",
          timer: 1800,
          showConfirmButton: false,
        });

        // 🔥 Refresh blogs on Home page
        fetchBlogs();

        // Reset form
        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("");
        setIsPublished(false);
        setDescription("");
        if (quillRef.current) quillRef.current.root.innerHTML = "";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Failed to add blog!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content...",
      });

      quillRef.current.on("text-change", () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 bg-green-50/40 text-gray-700 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-6 md:p-10 sm:m-10 shadow-lg rounded-xl border border-green-100">
        {/* Upload Thumbnail */}
        <p className="font-semibold mb-2 text-gray-800">Upload Thumbnail</p>
        <label
          htmlFor="image"
          className="w-32 h-20 border-2 border-dashed border-green-400 flex items-center justify-center rounded-lg cursor-pointer hover:bg-green-50 transition"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-500 text-sm">Upload</span>
          )}
        </label>
        <input
          type="file"
          id="image"
          hidden
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Blog Title */}
        <div className="mt-6">
          <label className="block mb-1 font-semibold text-gray-800">
            Blog Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type here"
            required
          />
        </div>

        {/* Sub Title */}
        <div className="mt-6">
          <label className="block mb-1 font-semibold text-gray-800">
            Sub Title
          </label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type here"
          />
        </div>

        {/* Blog Description + Generate Button */}
        <div className="mt-6 relative">
          <label className="block mb-1 font-semibold text-gray-800">
            Blog Description
          </label>
          <div
            ref={editorRef}
            className="min-h-[300px] border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500"
          />
          <button
            type="button"
            onClick={generateContent}
            disabled={loading}
            className="absolute bottom-2 right-2 text-xs bg-gradient-to-r from-green-500 to-green-700 text-white px-3 py-1.5 rounded-md shadow hover:scale-105 transition"
          >
            {loading ? "⏳ Generating..." : "✨ Generate with AI"}
          </button>
        </div>

        {/* Blog Category */}
        <div className="mt-6">
          <label className="block mb-1 font-semibold text-gray-800">
            Blog Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-40 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Startup">Startup</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Publish Checkbox */}
        <div className="mt-6 flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="publish" className="font-medium text-gray-800">
            Publish Now
          </label>
        </div>

        {/* Submit */}
        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          {isAdding ? "Adding..." : "➕ Add Blog"}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
