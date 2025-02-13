import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const PUT = async (request) => {

  await connect()

  const { id, email } = await request.json() 
  
  try {
    // const post = await Post.findOne({slug})

    const post = await Post.findOneAndUpdate(
      { _id: id },  // Filter by the post's ID
      { 
        $push: { likedBy: email }  // Add email to the 'likedBy' array
      },
      { new: true }  // This option ensures the returned document is the updated one
    )

    if (!post) {
      // Handle case where no post is found
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ res: {message: "Everything is OK"} }, { status: 201 })
    
  } catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}