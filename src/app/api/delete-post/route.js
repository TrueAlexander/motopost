import connect from "@/utils/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"


export const DELETE = async (request) => {

  const {slug} = await request.json()

  await connect()

  try {
    const deletedPost = await Post.findOneAndDelete({ slug: slug })

    if (!deletedPost) {
      return new NextResponse("Post not found", {
        status: 404, 
      })
    }

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