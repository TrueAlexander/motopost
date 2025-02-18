import connect from "@/utils/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"


export const PUT = async (request, {params}) => {

  const {slug} = params
  const postData  = await request.json() 

  await connect()

  try {
    const post = await Post.findOneAndUpdate(
      {slug},                                           
      { $set: { 
        slug: postData.slug,
        title: postData.title,
        content: postData.content,
        img: postData.img,
        catSlug: postData.catSlug,
        // author: session?.data?.user.name,
        // authorEmail: session?.data?.user.email,
        category: postData.category,
        folderId: postData.folderId,
        tags: postData.tags
      } },  
      { new: true }  
    )

    if (!post) {
      return new NextResponse("Post not found", {
        status: 404, 
      })
    }

    return new NextResponse("Post has been updated", {
      status: 200,
    })
    
  } catch (error) {
    console.log("error is here: ", error.message)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}