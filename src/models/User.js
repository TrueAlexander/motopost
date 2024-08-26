import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    liked: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema)