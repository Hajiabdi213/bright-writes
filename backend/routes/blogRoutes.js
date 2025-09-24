import express from "express";
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  publishBlog,
  addComment,
  getBlogComments,
  generateContent,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

// ➕ Add Blog
blogRouter.post("/add", upload.single("image"), addBlog);

// 📖 Get all blogs
blogRouter.get("/", getAllBlogs);

// 📖 Get single blog
blogRouter.get("/:id", getBlogById);

// ✏️ Update blog
blogRouter.put("/update/:id", updateBlog);

// ❌ Delete blog
blogRouter.delete("/delete/:id", deleteBlog);

// 🔄 Publish / Unpublish blog
blogRouter.patch("/publish/:id", publishBlog);

// 💬 Add comment
blogRouter.post("/add-comment", addComment);

// 📖 Get comments for a specific blog
blogRouter.get("/:blogId/comments", getBlogComments);

// 🤖 Generate content with AI
blogRouter.post("/generate", generateContent);

export default blogRouter;
