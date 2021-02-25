import React, { ReactElement } from 'react'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '~/store'

import { render, RenderResult } from '@hub/test-utils'

const renderWithContext = (children: ReactElement): RenderResult => {
  return render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default renderWithContext
