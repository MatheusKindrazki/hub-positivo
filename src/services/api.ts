import { create } from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const apiAuth = create({
  baseURL: process.env.REACT_APP_API_AUTH_URL,
});

export { apiAuth };

export default api;
