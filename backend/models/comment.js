import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Blog",  // xidhiidhka Blog
      required: true 
    },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // optional → admin kaliya approve karo
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
