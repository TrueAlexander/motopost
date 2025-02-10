"use client"
import { CldUploadWidget } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import styles from "./cloudUploadElement.module.css"

export default function CloudUploadElement({ imageId, setImageId, setFolder }) {

  const handleSuccess = (result) => setImageId(result.info.public_id)
  const handleError = (error) => console.error('Error uploading:', error)

  const generateFolderId = () => {
    const now = new Date()
    const add = (Math.floor(Math.random() * 900) + 100).toString()
    const dateStr = now
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]
      .concat('', add)// Get date in YYYYMMDDTHHMMSS format
    
    return dateStr
  }

  const folder = generateFolderId() // Generate folder on mount

   // Use useEffect to avoid regenerating folder id on each render
   useEffect(() => {
    setFolder(folder) // Pass folder ID to parent
  }, [setFolder]) // Empty dependency array to ensure it runs only once
  
  return (
    <div>
      <CldUploadWidget
        uploadPreset="upload_moto" // Make sure this is correctly configured in your Cloudinary account
        onSuccess={handleSuccess}
        onError={handleError} // Add an error handler to log any errors
        options={{
          folder: folder, // Specify the folder here (nested folders allowed)
          resource_type: 'image', // You can specify other resource types like video
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} className="button">
              Carregar
            </button>
          )
        }}
      </CldUploadWidget>

      {imageId && (
        <div className={styles.image}>
          <CldImage
            width="400"
            height="300"
            crop="fill"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        </div> 
      )}
    </div>
  )
}


