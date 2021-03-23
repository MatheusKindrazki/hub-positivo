import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@hub/test-utils'

import history from '~/services/history'

import { ContextHeaderProps } from '~/components/Header/context/types'
import * as header from '~/components/Header/context'
import Desktop from '~/components/Header/components/Desktop'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

jest.mock('~/components/Header/context', () => {
  const rest = jest.requireActual('~/components/Header/context')
  return {
    ...rest,
    useHeader: jest.fn()
  }
})

const useHeaderReturn = {
  schoolList: [
    {
      label: 'school_list_label',
      value: 'school_list_value',
      roles: ['school_list_roles']
    }
  ],
  roleList: [
    {
      name: 'role_name',
      icon: 'role_icon',
      colorProfile: 'role_color_profile',
      id: 'role_id',
      label: 'role_label',
      value: 'role_value'
    }
  ],
  setSchool: jest.fn(),
  setRole: jest.fn(),
  resetInfo: jest.fn(),
  defaultValue: {
    school: {
      value: 'default_school_value',
      label: 'default_school_label'
    },
    role: { value: 'default_role_value', label: 'default_role_label' }
  }
} as ContextHeaderProps

describe('get started', () => {
  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)

  const { defaultValue } = useHeaderReturn

  const name = 'Fake Name'
  const user = {
    user: {
      user: {
        name
      }
    }
  }

  const setup = (CUSTOM_STATE = { ...user } as CustomState) => {
    const openModalPass = jest.fn()
    const wrapper = render(<Desktop openModalPass={openModalPass} />, {
      reducers: ['tour', 'user', 'profile'],
      store,
      CUSTOM_STATE
    })

    const popOverTrigger = wrapper.getByTestId('popover-trigger')
    wrapper.storeUtils?.clearActions()
    return { ...wrapper, popOverTrigger }
  }
  it('Should dispatch a `@tour/OPEN_TOUR` action when `Fazer tour` button is clicked', () => {
    const { getByText, storeUtils } = setup({
      tour: {
        steps: [
          { content: 'content', position: 'right', selector: '#selector' }
        ]
      }
    })

    const tour = getByText(/Fazer tour/i)
    expect(tour).toBeInTheDocument()

    fireEvent.click(tour)

    const action = storeUtils?.getActions()

    expect(action).toStrictEqual([
      {
        payload: {
          open: true
        },
        type: '@tour/OPEN_TOUR'
      }
    ])
  })

  it('Popover should be visible when header`s avatar is clicked ', async () => {
    const { getByTestId, popOverTrigger } = setup()
    const popOverContent = getByTestId('popover-content')

    expect(popOverContent).not.toBeVisible()
    expect(popOverTrigger).toBeInTheDocument()

    fireEvent.click(popOverTrigger)
    await waitFor(() => expect(popOverContent).toBeVisible())
  })

  it.skip('should call `onOpen` function when `Estou com uma dúvida` is clicked', () => {
    const onClick = jest.fn()
    jest
      .spyOn('components', 'Button')
      .mockImplementation(() => <button onClick={onClick}>TESTE</button>)
    const { getByText, debug } = setup()
    const help = getByText(/Estou com uma dúvida/i)

    fireEvent.click(help)
    debug()
  })

  it('should dispatch an `@auth/SIGN_OUT` action when `Sair` is clicked', async () => {
    const spyPush = jest.spyOn(history, 'push')
    jest.useFakeTimers()
    const { findByText, storeUtils, popOverTrigger } = setup()

    fireEvent.click(popOverTrigger)
    const exit = await findByText(/Sair/i)

    fireEvent.click(exit)
    jest.runAllTimers()

    const action = storeUtils?.getActions()
    expect(action).toStrictEqual([{ type: '@auth/SIGN_OUT' }])
    expect(spyPush).toHaveBeenCalledWith('/login')
  })
})
