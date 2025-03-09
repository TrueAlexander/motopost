"use client"
import { CldUploadWidget } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'
import { useEffect, useState, useRef } from 'react'
import styles from "./cloudUploadElement.module.css"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import '@/utils/react-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert'
import { useRouter } from "next/navigation"

export default function CloudUploadElement({ imageId, setImageId, setFolder, modeCreate, setIsLoading }) {
  const { theme } = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
  const router = useRouter()
  
  useEffect(() => {
    if(imageId) setInitialImage(imageId)
  }, [])

  const previousImageIdRef = useRef(imageId) // Track the previous imageId in case of iterations

  const handleError = (error) => console.error('Error uploading:', error)

  const handleSuccess = !modeCreate ? 
  async (result) => {

   
    // The new image ID from Cloudinary's result
    const newImageId = result.info.public_id

    // Update the imageId state with the new image ID
    setImageId(newImageId)

    // Get the previous imageId from the ref
    const previousImageId = previousImageIdRef.current

    // Only delete the old image if it exists and is different from the new one
    if (previousImageId && previousImageId !== newImageId) {
      try {
        // Proceed to delete the old image if the previousImageId exists and is different from the new one
        const oldImageDelete = await fetch("/api/delete-image-cloud", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ publicId: previousImageId }) // Send the previous imageId
        })

        if (oldImageDelete.ok) {
          console.log('Old image deleted successfully')
        } else {
          console.error('Failed to delete old image')
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Não foi possível alterar a imagem principal.</p>
                <p>Tente novamente mais tarde.</p>
                <button
                  className="button"
                  onClick={() => { onClose(); router.push("/"); router.refresh(); }}
                >
                  Ok
                </button>
              </div>
            )
          })
        }
      } catch (error) {
        console.error('Error deleting image:', error)
        alert('Erro ao tentar deletar a imagem')
      }
    }
  } : 
  (result) => {
    // For create mode, just set the imageId to the new image ID
    setImageId(result.info.public_id)
  }

  // Folder name generation
  const generateFolderId = () => {
    const now = new Date()
    const add = (Math.floor(Math.random() * 900) + 100).toString()
    const dateStr = now
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0]
      .concat('', add)

    return dateStr
  }

  const folder = generateFolderId() // Generate folder on mount

  useEffect(() => {

    previousImageIdRef.current = imageId // Update ref to track the current imageId
    setFolder(folder) // Pass folder ID to parent
  }, [imageId, setFolder]) // Update ref when imageId changes

  const deleteUploaded = async () => {
    setIsLoading(true)
    if (imageId) {
      try {
        // Proceed to delete the image
        const oldImageDelete = await fetch("/api/delete-image-cloud", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ publicId: imageId })
        })

        if (oldImageDelete.ok) {
          console.log('Old image deleted successfully')
          setIsLoading(false)
          setImageId(null)
          // router.push("/criar")
        } else {
          console.error('Failed to delete old image')
        }
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
  }

  return (
    <div>
      <CldUploadWidget
        uploadPreset="upload_moto" // Ensure this is correctly configured in your Cloudinary account
        onSuccess={handleSuccess}
        onError={handleError} // Add an error handler to log any errors
        options={{
          folder: folder, // Specify the folder here (nested folders allowed)
          resource_type: 'image', // You can specify other resource types like video
          transformation: [
            { width: 800, height: 600, crop: "limit", quality: "auto" }, // Resize and compress
          ],
        }}
      >
        {({ open }) => (
          !imageId ? <button onClick={() => open()} className="button">
            Carregar
          </button> : <button onClick={deleteUploaded} className="button">
            Deletar
          </button>
        )}
      </CldUploadWidget>

      {imageId && (
        <div className={styles.image}>
          <CldImage
            width="400"
            height="300"
            crop="fill"
            src={imageId}
            sizes="100vw"
            loading="lazy"
            alt="my image"
          />
        </div>
      )}
    </div>
  )
}
