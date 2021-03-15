import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import { store } from '~/store'

import { useSendGlobalInfo } from '~/hooks/useSendGlobalInfo'

// Após merge do custom render com store na branch develop, refatorar para utilizar mock store
const StoreProvider: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useSend GlobalInfo hook should work properly', () => {
  it('Global Variable `window.__HUB_USER_INFO__` should be undefined before initialization of useSendGlobalInfo hook', () => {
    expect(window.__HUB_USER_INFO__).toBeUndefined()
  })

  it('Global Variable `window.__HUB_USER_INFO__` should be defined after initialization of useSendGlobalInfo hook', () => {
    renderHook(() => useSendGlobalInfo(), { wrapper: StoreProvider })
    expect(window.__HUB_USER_INFO__).toBeDefined()
  })
})
