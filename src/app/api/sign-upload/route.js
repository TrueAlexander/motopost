import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from "next/server"


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const POST = async (request) => {

  const { public_id, folder } = await request.json() 
  const timestamp = Math.floor(Date.now() / 1000)

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      public_id,
      folder
    },
    process.env.CLOUDINARY_API_SECRET
  )

  return new NextResponse(JSON.stringify({
    signature,
    timestamp,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    folder

  }, {status: 200}))
}


