import mongoose from "mongoose"

const { Schema } = mongoose

const commentSchema = new Schema(
  {
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post", 
    required: true 
  },
  author: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Comment", 
    default: null 
  }, // null = top-level comment
  }
)

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)