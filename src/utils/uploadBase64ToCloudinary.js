export const uploadBase64ToCloudinary = async (base64Image, folder) => {

  const public_id =`post-${Date.now()}`

  const sigRes = await fetch('/api/sign-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ public_id, folder }),
  })

  const { signature, timestamp, apiKey, cloudName } = await sigRes.json()

  const blob = await (await fetch(base64Image)).blob()
  // create a form
  const formData = new FormData()
  formData.append('file', blob)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)
  formData.append('public_id', public_id)
  formData.append('folder', folder)
 
  try {
    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    // Check if the response is ok
    if (cloudinaryRes.ok) {
      const data = await cloudinaryRes.json()
      console.log('Upload successful:', data);
      return data.secure_url // Return the URL of the uploaded image
    } else {
      // If the response is not successful, log the status and response body
      const errorText = await cloudinaryRes.text(); // Use .text() in case the response is not JSON
      console.error('Error uploading image:', cloudinaryRes.status, errorText);
      return null
    }
  } catch (error) {
      console.error('Uploading image error:', error)
      return null
  }
}