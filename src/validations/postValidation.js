import validator from "validator"

const postValidation = (image) => {
  let errors = {}
  const mimeType = ["image/jpeg", "image/png", "image/jpg", "image/gif"]

  const check = image ? mimeType.indexOf(image.type) : ""
  if (image === null) {
    errors.image = "Image Feild is required."
  } else if (check === -1) {
    errors.image = "Image must have .jpg ,.png ,.jpeg ,.gif extension"
  } else if (image.size > 1500000) {
    errors.image = "Image size must be less than 1.5 mb"
  }

  return {
    errors,
  }
}

export default postValidation
