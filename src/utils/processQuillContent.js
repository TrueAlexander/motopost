import { uploadBase64ToCloudinary } from "./uploadBase64ToCloudinary"

export const processQuillContent = async (htmlContent, folder) => {
  const imageRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/g
  const matches = [...htmlContent.matchAll(imageRegex)]

  const uploadedImages = await Promise.all(
    matches.map(async (match) => {
      const base64 = match[1]
      const url = await uploadBase64ToCloudinary(base64, folder)
      return { base64, url }
    })
  )

  let finalHtml = htmlContent
  uploadedImages.forEach(({ base64, url }) => {
    finalHtml = finalHtml.replace(base64, url)
  })

  return finalHtml
}