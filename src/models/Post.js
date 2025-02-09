import mongoose from "mongoose"

const { Schema } = mongoose

const postSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      required: false,
      default: 0,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    catSlug: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
      default: [],
    },
    likedBy: {
      type: Array,
      default: [],
    },
    videoLinks: {
      type: Array,
      default: [],
    },
    moderated: {
      type: Boolean,
      default: false
    },
    folderId: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
)

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema)