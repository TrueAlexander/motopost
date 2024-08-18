import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  await connect()

  const { id } = await request.json() 
  
  try {
    // const post = await Post.findOne({slug})

    const post = await Post.findOne({ _id: id })

    if (!post) {
      // Handle case where no post is found
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // if (postsArray.length > 0) { 
    //   return NextResponse.json({ res: postsArray }, { status: 201 })
    // }
    return NextResponse.json({ res: {likes: post.likes, views: post.views} }, { status: 201 })
    
  } catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}