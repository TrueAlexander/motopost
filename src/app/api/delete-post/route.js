import connect from "@/utils/db"
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper to extract image URLs
const extractCloudinaryUrlsFromHTML = (html) => {
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g
  const matches = [...html.matchAll(regex)]
  return matches
    .map((match) => match[1])
    .filter((src) => src.includes("res.cloudinary.com"))
}

// Helper to get public_id from URL
const extractPublicIdFromUrl = (url) => {
  const match = url.match(/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]{3,4})?(?:$|\?)/)
  return match ? match[1] : null
};

export const DELETE = async (request) => {

  const {postId} = await request.json()

  await connect()

  try {
    const deletedPost = await Post.findOneAndDelete({ _id: postId })

    if (!deletedPost) {
      return new NextResponse("Post not found", {
        status: 404, 
      })
    }

    // Extract embedded image URLs from content
    const embeddedImageUrls = extractCloudinaryUrlsFromHTML(deletedPost.content)
    const publicIds = embeddedImageUrls.map(extractPublicIdFromUrl).filter(Boolean)

    //  Delete all public IDs from Cloudinary
    await Promise.all(
      publicIds.map(async (publicId) => {
        try {
          const result = await cloudinary.uploader.destroy(publicId)
          console.log(`✅ Deleted ${publicId} →`, result)
        } catch (err) {
          console.error(`❌ Error deleting ${publicId} from Cloudinary:`, err.message);
        }
      })
    )

    // Delete related comments
    const deletedComments = await Comment.deleteMany({ postId })
    console.log(`${deletedComments.deletedCount} comments deleted`)

    return new NextResponse("Post and related images/comments deleted", {
      status: 200,
    })
    
  } catch (error) {
    console.log("❌ Error deleting post:", error.message)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}