import connect from "@/utils/db"
import User from "@/models/User"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const GET = async (request) => {

  const {searchParams} = new URL(request.url)
  const token = searchParams.get("token")
  
  const decoded = jwt.verify(token, process.env.JWT_KEY)
  const email = decoded.email
  const _id = decoded._id

  await connect()

  try {
    const user = await User.findOneAndUpdate(
      {email: email, _id: _id}, {emailVerified: true}, { new:true }
    )
    
    if(!user) {
      return new NextResponse(error.message, {
        status: 401,
        message: "User not found"
      }) 
    } else {
      // return NextResponse.redirect(`${process.env.BASE_URL}/notice?message=email_verified&user=${user.name}`) 
      return NextResponse.redirect(`${process.env.BASE_URL}/?verified=true`) 
    }  
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}
