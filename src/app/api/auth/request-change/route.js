import connect from "@/utils/db"
import User from "@/models/User"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const GET = async (request) => {

  const {searchParams} = new URL(request.url)
  const token = searchParams.get("token") 

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const email = decoded.email
    const _id = decoded._id
    await connect()

      ///temp
  return NextResponse.redirect(`${process.env.URL_BASE}/recover-access?mode=pass&id=${_id}`) 
  ///
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}