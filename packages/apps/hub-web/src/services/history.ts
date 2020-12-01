import { createHashHistory } from 'history'

const history = createHashHistory({
  basename: process.env.REACT_APP_PATHNAME_RESOLVE
})

export default history
