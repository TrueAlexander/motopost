import Post from "@/models/Post"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  await connect()
  const { page, catSlug } = await request.json() 

  const POST_PER_PAGE = 5
  
  try {
  
    /////
    if(catSlug) {
      const postsPromise = Post.find({catSlug: catSlug}).sort({ createdAt: -1 }).skip(POST_PER_PAGE * (page - 1)).limit(POST_PER_PAGE)
      const countPromise = Post.countDocuments({catSlug: catSlug})

      // Wait for both queries to resolve
      const [posts, count] = await Promise.all([postsPromise, countPromise]);
      return new NextResponse(JSON.stringify({ posts, count }, { status: 201 }))

    } else {
      const postsPromise = Post.find({}).sort({ createdAt: -1 }).skip(POST_PER_PAGE * (page - 1)).limit(POST_PER_PAGE)
      const countPromise = Post.countDocuments()

      // Wait for both queries to resolve
      const [posts, count] = await Promise.all([postsPromise, countPromise])
      return new NextResponse(JSON.stringify({ posts, count }, { status: 201 }))
    }
 
  } catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}