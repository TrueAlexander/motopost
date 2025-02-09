"use client"
import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'


export default function Page() {

  const [imageId, setImageId] = useState("")

  const handleSuccess = (result) => setImageId(result.info.public_id)
  const handleError = (error) => console.error('Error uploading:', error)


  const postId = "post0123456"

  return (
    <div>
      <CldUploadWidget
        uploadPreset="upload_moto" // Make sure this is correctly configured in your Cloudinary account
        onSuccess={handleSuccess}
        onError={handleError} // Add an error handler to log any errors
        options={{
          folder: `${postId}`, // Specify the folder here (nested folders allowed)
          resource_type: 'image', // You can specify other resource types like video
        }}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()}>
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



// const [imageId, setImageId] = useState("")

// console.log(imageId)


// const handleUploadComplete = async (result) => {
//   console.log('Upload completed:', result); // Log the upload result

//   try {
//     const response = await fetch('/api/save-file', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ file: result.info }),
//     });
//     const data = await response.json();
//     console.log('File saved:', data);
//   } catch (error) {
//     console.error('Error saving file:', error);
//   }
// };

