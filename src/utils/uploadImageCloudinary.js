export const uploadImageToCloudinary = async (base64Image, signature, timestamp) => {

  console.log("base: ", typeof base64Image)
  console.log("sign: ", typeof signature)
  console.log("time: ", typeof timestamp)

  // create a form
  const formData = new FormData()
  formData.append('file', base64Image)
  formData.append('upload_preset', 'upload_moto')
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
  
  try {
    //send to Cloud
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
      // mode: 'no-cors'
      
    
    })


     // Check if the response is ok
     if (res.ok) {
      const data = await res.json();
      console.log('Upload successful:', data);
      return data.secure_url;  // Return the URL of the uploaded image
    } else {
      // If the response is not successful, log the status and response body
      const errorText = await res.text();  // Use .text() in case the response is not JSON
      console.error('Error uploading image:', res.status, errorText);
      return null;
    }
  } catch (error) {
    console.error('Uploading image error:', error);
    return null;
  }


//     console.log("TUUUUT")
//     return res.data.secure_url; // Возвращаем URL изображения
//   } catch (error) {
//     console.error('Uploading image error:', error)
//     return null
//   }
}