import axios from 'axios';

export const ApiService = async (service, method, payload) => {
  const urlMapping = {
    Register: '/api/v1/users/register',
    Login: '/api/v1/users/login',
  };
  switch (method) {
    case 'POST':
      const res = await axios.post(urlMapping[service], payload);
      return res;
    case 'GET':
      break;
    default:
      break;
  }
};
