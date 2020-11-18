import { create } from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const apiAuth = create({
  baseURL: process.env.REACT_APP_API_AUTH_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { apiAuth };

export default api;
