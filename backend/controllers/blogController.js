import main from "../configs/gemini.js";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

// ➕ Add Blog
export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = req.body;
    const imagefile = req.file;

    if (!title || !description || !category || !imagefile) {
      return res.status(400).json({ success: false, message: "⚠️ Missing required fields" });
    }

    const fileBuffer = imagefile.buffer.toString("base64");

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imagefile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }],
    });

    const blog = await Blog.create({
      title,
      subtitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
    });

    return res.status(201).json({ success: true, message: "✅ Blog Added successfully", blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 📖 Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 📖 Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "❌ Blog not found" });
    return res.json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, description, category, isPublished },
      { new: true }
    );

    if (!blog) return res.status(404).json({ success: false, message: "❌ Blog not found" });

    return res.json({ success: true, message: "✅ Blog updated successfully", blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete blog + its comments
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: "❌ Blog not found" });

    await Comment.deleteMany({ blog: id });

    return res.json({ success: true, message: "✅ Blog and its comments deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 🔄 Publish / Unpublish blog
export const publishBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const blog = await Blog.findByIdAndUpdate(id, { isPublished }, { new: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: "❌ Blog not found" });
    }

    return res.json({
      success: true,
      message: isPublished ? "✅ Blog published successfully" : "🚫 Blog unpublished successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 💬 Add comment
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.status(400).json({ success: false, message: "⚠️ Blog, name and content are required" });
    }

    const comment = await Comment.create({ blog, name, content });

    return res.status(201).json({ success: true, message: "✅ Comment added for review", comment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 📖 Get comments for a blog
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    return res.json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 🤖 Generate Content with Gemini
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "⚠️ Prompt is required" });
    }

    const content = await main(prompt);
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
