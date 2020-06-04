import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  name: yup.string().min(3).max(10).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  password2: yup.string().required(),
});

const registerValidation = async (userData) => {
  let resObj = {};
  try {
    const valid = await RegisterSchema.validate(userData, {
      abortEarly: false,
    });
    resObj.successMessage = valid;
    return resObj;
  } catch (error) {
    let errorMessage = {};
    error.inner.forEach((yupError) => {
      errorMessage[yupError.path] = yupError.message;
    });
    resObj.errorMessage = errorMessage;
    return resObj;
  }
};

export default registerValidation;
