import connect from "@/utils/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"


export const PUT = async (request, {params}) => {

  const {slug} = params
  const postData  = await request.json() 

  await connect()

  ////////////////
  const updatedFields = {}

  // Check if `postData` contains other fields beyond `img`
  if (postData.title) updatedFields.title = postData.title
  if (postData.content) updatedFields.content = postData.content

  if (postData.img) updatedFields.img = postData.img === "deleted" ? null : postData.img

  if (postData.catSlug) updatedFields.catSlug = postData.catSlug
  if (postData.category) updatedFields.category = postData.category
  if (postData.folderId) updatedFields.folderId = postData.folderId
  if (postData.tags) updatedFields.tags = postData.tags
  if (postData.slug)  updatedFields.slug = postData.slug


  // Only `img` field if postData.length <= 1
  if (Object.keys(updatedFields).length === 1 && updatedFields.img) {

    try {
      const post = await Post.findOneAndUpdate(
        { slug },
        { $set: { img: updatedFields.img } },  // Only update the `img`
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

  } else {
    try {
      const post = await Post.findOneAndUpdate(
        { slug },
        { $set: updatedFields },  // Update the entire object
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

  ////////////



  // try {
  //   const post = await Post.findOneAndUpdate(
  //     {slug},                                           
  //     { $set: { 
  //       slug: postData.slug,
  //       title: postData.title,
  //       content: postData.content,
  //       img: postData.img,
  //       catSlug: postData.catSlug,
  //       // author: session?.data?.user.name,
  //       // authorEmail: session?.data?.user.email,
  //       category: postData.category,
  //       folderId: postData.folderId,
  //       tags: postData.tags
  //     } },  
  //     { new: true }  
  //   )

  //   if (!post) {
  //     return new NextResponse("Post not found", {
  //       status: 404, 
  //     })
  //   }

  //   return new NextResponse("Post has been updated", {
  //     status: 200,
  //   })
    
  // } catch (error) {
  //   console.log("error is here: ", error.message)
  //   return new NextResponse(error.message, {
  //     status: 500,
  //   })
  // }
}