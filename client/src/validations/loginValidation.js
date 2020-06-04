import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loginValidation = async (userData) => {
  let resObj = {};
  try {
    const valid = await loginSchema.validate(userData, { abortEarly: false });
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

export default loginValidation;
