import connect from "@/utils/db"
import User from "@/models/User"
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