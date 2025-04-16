import connect from "@/utils/db"
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"

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

    const deletedComments = await Comment.deleteMany({ postId: postId })
    console.log(`${deletedComments.deletedCount} comments deleted`)

    return new NextResponse("Post has been deleted", {
      status: 200,
    })
    
  } catch (error) {
    console.log("error is here: ", error.message)
    return new NextResponse(error.message, {
      status: 500,
    })
  }


}