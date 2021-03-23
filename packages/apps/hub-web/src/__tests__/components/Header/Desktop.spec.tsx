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
      roles: ['PROFESSOR'],
      label: 'Escola Editora Positivo - Positivo ON SPE',
      value: 'ef6f00c9-bd31-47e4-be51-bbbbbb'
    },

    {
      roles: [
        'PAIS_E_RESPONSAVEIS',
        'COORDENADOR',
        'PROFESSOR',
        'ADMINISTRADOR'
      ],
      label: 'Escola Positivo ON SPE 18-005',
      value: '21694ec0-88be-4231-ac2a-392dbf835518'
    }
  ],
  roleList: [
    {
      name: 'Administrador',
      icon: 'administrador',
      colorProfile: 'administrador',
      id: 'ADMINISTRADOR',
      label: 'Administrador',
      value: 'administrador'
    }
  ],
  defaultValue: {
    school: {
      label: 'Escola Positivo ON SPE 18-005',
      value: '21694ec0-88be-4231-ac2a-392dbf835518'
    },
    role: { label: 'Administrador', value: 'administrador' }
  },
  setRole: jest.fn(),
  setSchool: jest.fn(),
  resetInfo: jest.fn()
} as ContextHeaderProps

describe('get started', () => {
  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)

  // const { defaultValue } = useHeaderReturn

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
    const popOverContent = wrapper.getByTestId('popover-content')
    const popOverTrigger = wrapper.getByTestId('popover-trigger')

    wrapper.storeUtils?.clearActions()
    return { ...wrapper, popOverTrigger, popOverContent }
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
    const { popOverTrigger, popOverContent } = setup()

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

  it('Should dispatch an `@auth/SIGN_OUT` action when `Sair` is clicked', async () => {
    jest.useFakeTimers()
    const spyPush = jest.spyOn(history, 'push')
    const { findByText, storeUtils, popOverTrigger } = setup()

    fireEvent.click(popOverTrigger)
    const exit = await findByText(/Sair/i)

    fireEvent.click(exit)
    jest.runAllTimers()

    const action = storeUtils?.getActions()
    expect(action).toStrictEqual([{ type: '@auth/SIGN_OUT' }])
    expect(spyPush).toHaveBeenCalledWith('/login')
  })

  it('Should close Popover when component is on blur or escape (ESC)', async () => {
    const { resetInfo } = useHeaderReturn

    const { popOverTrigger, popOverContent } = setup()

    fireEvent.click(popOverTrigger)

    await waitFor(() =>
      expect(popOverContent).toHaveStyle('visibility: visible')
    )

    fireEvent.keyDown(popOverContent, { key: 'Esc', code: 27 })

    expect(resetInfo).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(popOverContent).toHaveStyle('visibility: hidden')
    )
  })
})
