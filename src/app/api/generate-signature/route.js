import cloudinary from 'cloudinary'
import crypto from 'crypto'
import { NextResponse } from "next/server"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const GET = async () => 
  {
    const timestamp = Math.floor(Date.now() / 1000)   
    const signature = await cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      process.env.CLOUDINARY_API_SECRET
    );


    return new NextResponse(JSON.stringify({
      signature,
      timestamp,
    }, {status: 200}))
}
