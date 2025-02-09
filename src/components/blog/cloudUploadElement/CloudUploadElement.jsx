"use client"
import { CldUploadWidget } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'


export default function CloudUploadElement({author, folderId, setFolderId, imageId, setImageId}) {

  const handleSuccess = (result) => setImageId(result.info.public_id)
  const handleError = (error) => console.error('Error uploading:', error)


  // const generateFolderId = (username) => {
  //   const now = new Date()
  //   const dateStr = now.toISOString().replace(/[-:]/g, '').split('.')[0] // Get date in YYYYMMDDTHHMMSS format
  //   return `${dateStr}${username}`
  // }

  // useEffect(() => {
  //   setFolderId(generateFolderId(author))
  // },[])

  // console.log("folderId: ", folderId)

  // const a = "test"

  return (
    <div>
      <CldUploadWidget
        uploadPreset="upload_moto" // Make sure this is correctly configured in your Cloudinary account
        onSuccess={handleSuccess}
        onError={handleError} // Add an error handler to log any errors
        // options={{
        //   folder: `${a}/folder`, // Specify the folder here (nested folders allowed)
        //   resource_type: 'image', // You can specify other resource types like video
        // }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className='button'>
              Upload an Image
            </button>
          )
        }}
      </CldUploadWidget>

      {imageId && (<CldImage
        width="400"
        height="400"
        crop="fill"
        src={imageId}
        sizes="100vw"
        alt="Description of my image"
      />)}
    </div>
  );
}


