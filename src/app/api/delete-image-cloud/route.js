import cloudinary from "cloudinary"
import { NextResponse } from "next/server"

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Your Cloudinary Cloud Name
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, // Your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API Secret
});

export const DELETE = async (request) => {

  const { publicId } = await request.json() 

  const publicIdCleaned = publicId.replace(/^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9]+\/image\/upload\//, '')
 
  if (!publicIdCleaned) {
    return new NextResponse("PublicId not found", {
        error: 'Public ID is required',
        status: 400, 
    })
  }

  try {
    // Delete the image from Cloudinary
    const result = await cloudinary.v2.uploader.destroy(publicIdCleaned)

    if (result.result === 'ok') {
      // Image deleted successfully
      return new NextResponse({
        message: 'Image deleted successfully',
        status: 200, 
      })
    } else {
      // Cloudinary failed to delete image
      return new NextResponse({
        error: 'Failed to delete image from Cloudinary',
        status: 500, 
    })}
  } catch (error) {
    console.error("error is here: ", error.message);
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}
