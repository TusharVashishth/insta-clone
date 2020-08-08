import validator from "validator"
const signupValidator = (data) => {
  let errors = {}

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required ."
  } else if (!validator.isLength(data.username, { min: 2 })) {
    errors.username = "Username must be  2 character long."
  } else if (!validator.isLength(data.username, { max: 30 })) {
    errors.username = "Username must be below 30 character."
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required."
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Please enter valid email."
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required."
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be 6 characters long."
  } else if (!validator.isLength(data.password, { max: 30 })) {
    errors.password = "Password must be below  31 characters."
  }
  if (!validator.isEmpty(data.cpassword)) {
    if (data.cpassword !== data.password) {
      errors.cpassword = "Confirm password not match."
    }
  } else {
    errors.cpassword = "Confirm password is required."
  }

  return {
    errors,
  }
}

export default signupValidator
