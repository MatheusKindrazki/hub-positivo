import axios from 'apisauce'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const apiAuth = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_URL
})

const apiAuthProduct = axios.create({
  baseURL: 'https://appsv-tokenmanagement-dev-001.azurewebsites.net'
})

export { apiAuth, apiAuthProduct }

export default api
