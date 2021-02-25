import React, { ReactElement } from 'react'

import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from 'redux-mock-store'

import { persistor, store } from '~/store'

import { render, RenderResult } from '@hub/test-utils'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const mockStore = configureStore(middlewares)

const renderWithContext = (
  children: ReactElement,
  INITIAL_STATE = {}
): RenderResult => {
  return render(
    <Provider store={mockStore({ ...store.getState(), ...INITIAL_STATE })}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default renderWithContext
