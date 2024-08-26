import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export const PUT = async (request) => {

  const {id, pass1} = await request.json() 
 
  await connect()


  try {
    const hashedPassword = await bcrypt.hash(pass1, 5)
   
    const res = await User.findByIdAndUpdate(
      {_id: id}, 
      {password: hashedPassword},  
      { new: true } 
    )

    return new NextResponse("The password was updated in DB", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}