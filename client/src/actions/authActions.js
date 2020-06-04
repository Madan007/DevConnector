import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import loginValidation from '../validations/loginValidation';
import registerValidation from '../validations/registerValidation';

const urlMapping = {
  Register: '/api/v1/users/register',
  Login: '/api/v1/users/login',
};

// Register User
export const registerUser = (payload, history) => async (dispatch) => {
  const validationRes = await registerValidation(payload);
  if (validationRes.errorMessage)
    return dispatch({ type: GET_ERRORS, payload: validationRes.errorMessage });
  const res = await axios.post(urlMapping.Register, payload);
  if (res.data.errorMessage)
    return dispatch({ type: GET_ERRORS, payload: res.data.errorMessage });
  return history.push('/login');
};

// Login User
export const loginUser = (payload) => async (dispatch) => {
  const validationRes = await loginValidation(payload);
  if (validationRes.errorMessage)
    return dispatch({ type: GET_ERRORS, payload: validationRes.errorMessage });
  const res = await axios.post(urlMapping.Login, payload);
  if (res.data.errorMessage)
    return dispatch({ type: GET_ERRORS, payload: res.data.errorMessage });

  //save user token in localstorage
  const { token } = res.data;
  localStorage.setItem('jwt-token', token);

  //Set token to auth header
  setAuthToken(token);

  //Decode Auth Token to get user data
  const decodedToken = jwt_decode(token);
  dispatch(setCurrentUser(decodedToken));
};

//Set Logged in user details
export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken,
  };
};
