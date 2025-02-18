// "use client"
// import { CldUploadWidget } from 'next-cloudinary'
// import { CldImage } from 'next-cloudinary'
// import { useEffect, useState } from 'react'
// import styles from "./cloudUploadElement.module.css"
// import { ThemeContext } from "@/context/ThemeContext"
// import { useContext } from 'react'
// import confirmAlertStyles from '@/utils/confirmAlert.module.css'
// import '@/utils/react-confirm-alert.css'
// import { confirmAlert } from 'react-confirm-alert'
// import { useRouter } from "next/navigation"

// export default function CloudUploadElement({ imageId, setImageId, setFolder, modeCreate }) {

//   const {theme} = useContext(ThemeContext)
//   const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
//   const router = useRouter()

//   // const [imageIdDel, setImageIdDel] = useState(imageId)

//   console.log("imageId from page im the widget: ", imageId)
//   // console.log("ImageIdDelete: ", imageIdDel)

//   // useEffect(() =>{
//   //   if (imageId) {
//   //     setImageId(imageId) 
//   //   }
//   // },[imageId])

//   // const handleSuccess = (result) => setImageId(result.info.public_id)
//   const handleError = (error) => console.error('Error uploading:', error)

//   const handleSuccess = !modeCreate ? async (result) => {
//     // Get the new image ID from Cloudinary's result
//     const newImageId = result.info.public_id;

   

//     // Proceed to delete the old image only if an old imageId exists
//     // if (imageId 
//     //   // && imageId !== newImageId
//     // ) {
//         try {
//             const oldImageDelete = await fetch("/api/delete-image-cloud", {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ publicId: imageId }) // Send the old imageId
//             });

//             // Handle success/failure of the image deletion
//             if (oldImageDelete.ok) {
//                // Update the imageId state with the new image ID first
//                 setImageId(newImageId);
//                 console.log('Old image deleted successfully');
//             } else {
//                 console.error('Failed to delete old image');
//                 // Handle failure scenario (e.g., show an alert)
//                 confirmAlert({
//                     customUI: ({ onClose }) => (
//                         <div className={themeClass}>
//                             <p>Não foi possível alterar a imagem principal.</p>
//                             <p>Tente novamente mais tarde.</p>
//                             <button 
//                                 className="button"
//                                 onClick={() => { onClose(); router.push("/"); router.refresh(); }}
//                             >
//                                 Ok
//                             </button>
//                         </div>
//                     )
//                 });
//             }
//         } catch (error) {
//             console.error('Error deleting image:', error);
//             // Handle network error
//             alert('Erro ao tentar deletar a imagem');
//         }
    
// } : (result) => {
//     // For create mode, just set the imageId to the new image ID
//     setImageId(result.info.public_id);
// }


//   // const handleSuccess = !modeCreate ? async (result) => {
    
//   //   console.log(imageId)
//   //   try {
      
//   //     const newImageId = result.info.public_id
//   //     setImageId(newImageId)

//   //     const oldImageDelete = await fetch("/api/delete-image-cloud", {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-Type": "application/json"
//   //       },
//   //       body: JSON.stringify({ publicId: imageId })
//   //     })

//   //     // if(oldImageDelete.ok) {
//   //     //   setImageId(result.info.public_id)
//   //     // } else {
//   //     if(!oldImageDelete.ok) {
//   //       confirmAlert({
//   //         customUI: ({ onClose }) => (
//   //           <div className={themeClass}>
//   //             <p>Não foi possível alterar a imagem principal.</p> <p>Tente novamente mais tarde.</p>
//   //             <button 
//   //               className="button"
//   //               onClick={() => { onClose();  router.push("/"); router.refresh(); }}
//   //             >
//   //               Ok
//   //             </button>
//   //           </div>
//   //         )
//   //       })  
//   //     }

      
//   //   } catch (error) {
//   //     alert(error)
//   //   }
    



   
//   // } : (result) => {
//   //   setImageId(result.info.public_id)
//   // }

//   const generateFolderId = () => {
//     const now = new Date()
//     const add = (Math.floor(Math.random() * 900) + 100).toString()
//     const dateStr = now
//       .toISOString()
//       .replace(/[-:]/g, '')
//       .split('.')[0]
//       .concat('', add)// Get date in YYYYMMDDTHHMMSS format
    
//     return dateStr
//   }

//   const folder = generateFolderId() // Generate folder on mount

//    // Use useEffect to avoid regenerating folder id on each render
//    useEffect(() => {
//     setFolder(folder) // Pass folder ID to parent
//   }, [setFolder]) // Empty dependency array to ensure it runs only once
  
//   return (
//     <div>
//       <CldUploadWidget
//         uploadPreset="upload_moto" // Make sure this is correctly configured in your Cloudinary account
//         onSuccess={handleSuccess}
//         onError={handleError} // Add an error handler to log any errors
//         options={{
//           folder: folder, // Specify the folder here (nested folders allowed)
//           resource_type: 'image', // You can specify other resource types like video
//           transformation: [
//             { width: 800, height: 600, crop: "limit", quality: "auto" }, // Resize and compress
//           ],
//         }}
//       >
//         {({ open }) => {
//           return (
//             <button onClick={() => open()} className="button">
//               Carregar
//             </button>
//           )
//         }}
//       </CldUploadWidget>

//       {imageId && (
//         <div className={styles.image}>
//           <CldImage
//             width="400"
//             height="300"
//             crop="fill"
//             src={imageId}
//             sizes="100vw"
//             loading="lazy"
//             alt="my image"
//           />
//         </div> 
//       )}
//     </div>
//   )
// }


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

export default function CloudUploadElement({ imageId, setImageId, setFolder, modeCreate }) {
  const { theme } = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
  const router = useRouter()

  const previousImageIdRef = useRef(imageId) // Track the previous imageId

  const handleError = (error) => console.error('Error uploading:', error)

  const handleSuccess = !modeCreate ? async (result) => {
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
  } : (result) => {
    // For create mode, just set the imageId to the new image ID
    setImageId(result.info.public_id)
  }

  // Folder generation
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
          <button onClick={() => open()} className="button">
            Carregar
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
