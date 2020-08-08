import validator from "validator"

const loginValidation = (data) => {
  let errors = {}

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required."
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Please enter valid email."
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required"
  }

  return {
    errors,
  }
}

export default loginValidation
