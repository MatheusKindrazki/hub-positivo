import React from 'react'

import { act } from 'react-dom/test-utils'
import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import { store } from '~/store'

import { useHeader, HeaderProvider } from '~/components/Header/context'

import { useHeaderReturn } from '~/__mocks__/HeaderContext'

const Context: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <HeaderProvider>{children}</HeaderProvider>
    </Provider>
  )
}

describe('Testing useHeader', () => {
  afterAll(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  it('Should return define a Header Context', () => {
    const {
      result: { current: context }
    } = renderHook(() => useHeader(), { wrapper: Context })

    expect(context).toBeDefined()
  })

  it('Should throw an error when context is not provided', () => {
    jest.spyOn(React, 'useContext').mockReturnValue(undefined)

    expect(() => {
      const {
        result: { current: _ }
      } = renderHook(() => useHeader())
    }).toThrow(new Error('É obrigatório o usuário do Provider'))
  })
})

describe('Testing HeaderContext', () => {
  it.skip('Should change role infos when setRole is called', () => {
    const {
      result: { current: context }
    } = renderHook(() => useHeader(), { wrapper: Context })
    act(() => {
      // context.setSchool(useHeaderReturn.roleList[0])
      // context.setSchool({} as any)
    })
    // expect(context).toStrictEqual('')
  })
})
