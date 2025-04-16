import Post from "@/models/Post"
import Comment from "@/models/Comment"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  await connect()
  const { postId } = await request.json() 
  
  try {
      /////
      const res = await Comment.find({postId: postId})
 
      return new NextResponse(JSON.stringify(res, { status: 201 }))
    } 
 
   catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}