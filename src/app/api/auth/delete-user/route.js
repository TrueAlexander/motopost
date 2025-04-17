import connect from "@/utils/db"
import User from "@/models/User"
import Post from "@/models/Post"
import Comment from "@/models/Comment"
import { NextResponse } from "next/server"


export const DELETE = async (request) => {

  const {email} = await request.json()

  await connect()

  try {
    const deletedUser = await User.findOneAndDelete({ email: email })

    if (!deletedUser) {
      return new NextResponse("User not found", {
        status: 404, 
      })
    }
    // Change all their posts' author to "Deletado"
    await Post.updateMany(
      { author: deletedUser.name }, // or deletedUser._id depending on how you store it
      { $set: { author: "Deletado" } }
    )

    // Change all their comments' author to "Deletado"
    await Comment.updateMany(
      { author: deletedUser.name }, // or deletedUser._id depending on how you store it
      { $set: { author: "Deletado", authorEmail: "Deletado" } }
    )
    
    return new NextResponse("User has been deleted", {
      status: 200,
    })
    
  } catch (error) {
    console.log("error is here: ", error.message)
    return new NextResponse(error.message, {
      status: 500,
    })
  }


}