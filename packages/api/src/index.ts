import axios from 'apisauce'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json;'
  }
})

const apiEEMAuth = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_URL
})

const apiEEMInfos = axios.create({
  baseURL: process.env.REACT_APP_API_EEM_INFOS
})

const apiAuthProduct = axios.create({
  baseURL: process.env.REACT_APP_API_AUTH_PRODUCT_URL
})

const apiLivro = axios.create({
  baseURL: process.env.REACT_APP_API_ARVORE
})

const apiMHUND = axios.create({
  baseURL: process.env.REACT_APP_API_MHUND
})

export { apiEEMAuth, apiAuthProduct, apiEEMInfos, apiLivro, apiMHUND }

export default api
