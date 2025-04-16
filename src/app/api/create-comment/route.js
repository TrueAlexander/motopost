import Comment from "@/models/Comment"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const commentData  = await request.json() 
 
  const newComment = new Comment(commentData)
  console.log(commentData)
  
  await connect()

  try {
    //find all the comments with the saume author and text for the same post. returns array
    // const sameComments = await Comment.find(
    //   {
    //     author: newComment.author,
    //     text: new RegExp(`^${newComment.text}$`, 'i'),
    //     postId: newComment.postId
 
    //   }
    // )
    // if (sameComments < 1) {
    //   const comment = await newComment.save()
    //   return NextResponse.json("Comment has been created", {
    //     status: 201,
    //   }) 
    // } else {
    //   return NextResponse.json("The same Comment with the same Author had been created before", {
    //     status: 400,
    //   }) 
    // }

    const comment = await newComment.save()
      return NextResponse.json("Comment has been created", {
        status: 201,
      })      
   } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}