export const extractPublicIdFromUrl = (url) => {
  const parts = url.split('/upload/')[1] // get the path after upload/
  const publicIdWithExtension = parts.split('.')[0] // remove extension
  return publicIdWithExtension
}