import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga'
// import { MockStore } from 'redux-mock-store'
import configureStore from 'redux-mock-store'

import { reducerArray } from '~/store/modules/rootReducer'

import history from '~/services/history'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const mockStore = configureStore(middlewares)

const store = mockStore(reducerArray)

export default store
