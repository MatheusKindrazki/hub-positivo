import axios from 'apisauce'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const apiEEMAuth = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_URL
})

const apiEEMInfos = axios.create({
  // baseURL: process.env.REACT_APP_API_EEM_INFOS
  baseURL: 'https://api.escolaapp.com/recursos/api'
})

const apiAuthProduct = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_PRODUCT_URL
})

const apiLivro = axios.create({
  baseURL: 'https://appsv-arvorelivro-dev-001.azurewebsites.net/api/arvore'
})

const apiMHUND = axios.create({
  baseURL: 'https://appsv-saedigital-dev-001.azurewebsites.net/api/mhund'
})

export { apiEEMAuth, apiAuthProduct, apiEEMInfos, apiLivro, apiMHUND }

export default api
