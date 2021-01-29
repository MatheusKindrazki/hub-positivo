import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore, Store } from 'redux'

import history from '~/services/history'

import rootSaga from './modules/rootSaga'
import createRootReducer from './modules/rootReducer'

const encrypted = encryptTransform({
  secretKey: process.env.REACT_APP_SECRET_ENCRYPTED_KEY || 'PSD-HUB'
})

const persistName = process.env.REACT_APP_PERSIST_NAME || '@PSD:HUB'

const persistConfig = {
  key: persistName,
  storage,
  whitelist: ['auth', 'user', 'profile', 'educationalStage'],
  transforms: [encrypted]
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, routerMiddleware(history)]

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
)

const compose = composeWithDevTools(applyMiddleware(...middlewares))

const store: Store<Store.State> = createStore(persistedReducer, compose)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
