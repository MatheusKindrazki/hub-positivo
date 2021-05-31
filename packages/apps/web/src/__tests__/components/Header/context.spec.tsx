import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import { act } from '@psdhub/test-utils'

import { useHeader, HeaderProvider } from '~/components/Header/context'

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
    jest.restoreAllMocks()
  })

  it('Should dispatch an `@auth/FIRST_ACCESS` action when setRole is triggered', () => {
    const {
      result: { current }
    } = renderHook(() => useHeader(), { wrapper: Context })
    act(() => {
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
  it('Should call useState`s handle function when setSchool is triggered', async () => {
    const setState = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [[{}], setState] as any)

    const {
      result: { current }
    } = renderHook(() => useHeader(), { wrapper: Context })

    act(() => {
      current.setSchool({ label: 'label', roles: ['roles'], value: 'value' })
    })

    expect(setState).toHaveBeenCalledWith({
      label: 'label',
      roles: ['roles'],
      value: 'value'
    })
  })

  it('Should call useState`s handle function when resetInfo is triggered', () => {
    const setState = jest.fn()
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [[], setState] as any)

    const {
      result: { current }
    } = renderHook(() => useHeader(), { wrapper: Context })

    act(() => {
      current.resetInfo()
    })

    expect(setState).toHaveBeenCalledWith({
      label: undefined,
      value: undefined
    })
    expect(setState).toHaveBeenCalledWith({
      label: 'Default',
      value: 'default'
    })
    expect(setState).toHaveBeenCalledWith(undefined)
  })
})
