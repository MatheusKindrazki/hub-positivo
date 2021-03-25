import React, { useContext } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import { store } from '~/store'

import { act, render } from '@hub/test-utils'

import {
  useHeader,
  HeaderProvider,
  HeaderContext
} from '~/components/Header/context'

import { useHeaderReturn } from '~/__mocks__/HeaderContext'
import fakeStore from '~/__mocks__/fakeStore.mock'

const Context: React.FC = ({ children }) => {
  return (
    <Provider store={fakeStore}>
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
  const role = {
    colorProfile: 'blue',
    icon: 'icon',
    id: 'id',
    label: 'label',
    name: 'name',
    value: 'value'
  }

  afterEach(() => {
    fakeStore.clearActions()
  })

  it('Should dispatch an `@auth/FIRST_ACCESS` action when setRole is triggered', () => {
    const {
      result: { current }
    } = renderHook(() => useHeader(), { wrapper: Context })
    act(() => {
      // current.setSchool({ label: 'teste', roles: ['teste'], value: 'teste' })
      current.setRole(role)
    })
    const actions = fakeStore.getActions()

    expect(actions).toStrictEqual([
      {
        type: '@auth/FIRST_ACCESS',
        payload: {
          profiles: [],
          selected_profile: role,
          selected_school: {
            label: undefined,
            value: undefined
          }
        }
      }
    ])
  })

  it.skip('', () => {
    const {
      result: { current }
    } = renderHook(() => useHeader(), { wrapper: Context })
    act(() => {
      current.setSchool({ label: 'teste', roles: ['teste'], value: 'teste' })
    })
    const actions = fakeStore.getActions()

    expect(actions).toStrictEqual(['teste'])
  })
})
