import axios from 'apisauce'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

const apiAuth = axios.create({
  baseURL: 'http://localhost:3333'
})

export { apiAuth }

export default api
