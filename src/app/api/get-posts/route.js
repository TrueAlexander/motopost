import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  await connect()
  const { catSlug } = await request.json() 
  
  try {
    const postsArray = catSlug ? await Post.find({catSlug: catSlug}) : await Post.find({})

    // if (postsArray.length > 0) { 
    //   return NextResponse.json({ res: postsArray }, { status: 201 })
    // }
    return NextResponse.json({ res: postsArray }, { status: 201 })
    
  } catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}