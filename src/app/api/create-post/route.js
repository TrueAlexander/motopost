import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const postData  = await request.json() 
 
  const newPost = new Post(postData)
  
  await connect()

  try {
    const samePost = await Post.find({title: newPost.title})

    console.log("same post:", samePost)
    if (samePost < 1) {
      const post = await newPost.save()
      return NextResponse.json("Post has been created", {
        status: 201,
      }) 
    } else {
      return NextResponse.json("The same Post had been created before", {
        status: 400,
      }) 
    }

    // 
     
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}