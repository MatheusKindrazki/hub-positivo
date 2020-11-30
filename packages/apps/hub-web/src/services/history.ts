import { createBrowserHistory } from 'history'

const history = createBrowserHistory({
  basename: process.env.REACT_APP_PATHNAME_RESOLVE
})

export default history
