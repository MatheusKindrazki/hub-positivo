import axios from 'apisauce'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const apiAuth = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_URL
})

const apiAuthProduct = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_PRODUCT_URL
})

export { apiAuth, apiAuthProduct }

export default api
