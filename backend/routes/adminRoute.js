import express from "express";
import {
  adminLogin,
  approveCommentById,   // ✅ sax
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminrouter = express.Router();

// 🔑 Login
adminrouter.post("/login", adminLogin);

// 📖 Comments & Blogs
adminrouter.get("/comments", auth, getAllComments);
adminrouter.get("/blogs", auth, getAllBlogsAdmin);

// ❌ Delete & ✅ Approve Comment
adminrouter.post("/delete-comment", auth, deleteCommentById);
adminrouter.post("/approve-comment", auth, approveCommentById);

// 📊 Dashboard
adminrouter.get("/dashboard", auth, getDashboard);

export default adminrouter;
