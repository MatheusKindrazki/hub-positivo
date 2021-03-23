import React from 'react'

import reactEvent from 'react-select-event'

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
    },
    {
      name: 'Coordenador',
      icon: 'coordenador',
      colorProfile: 'coordenador',
      id: 'COORDENADOR',
      label: 'Coordenador',
      value: 'coordenador'
    }
  ],
  defaultValue: {
    school: {
      label: 'Escola Positivo ON SPE 18-005',
      value: '21694ec0-88be-4231-ac2a-392dbf835518'
    },
    role: { label: 'Administrador', value: 'Administrador' }
  },
  setRole: jest.fn(),
  setSchool: jest.fn(),
  resetInfo: jest.fn()
} as ContextHeaderProps

const name = 'FirstName, LastName'
const user = {
  user: {
    user: {
      name
    }
  }
}

describe('get started', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)
  const spyPush = jest.spyOn(history, 'push')

  const setup = (CUSTOM_STATE = { ...user } as CustomState) => {
    const openModalPass = jest.fn()
    const wrapper = render(<Desktop openModalPass={openModalPass} />, {
      reducers: ['tour', 'user', 'profile'],
      store,
      CUSTOM_STATE
    })

    const popOverContent = wrapper.getByTestId('popover-content')
    const popOverTrigger = wrapper.getByTestId('popover-trigger')

    const blurEffect = (element: HTMLElement): boolean =>
      fireEvent.keyDown(element, { key: 'Esc', code: 27 })

    wrapper.storeUtils?.clearActions()
    return { ...wrapper, popOverTrigger, popOverContent, blurEffect }
  }

  const {
    defaultValue,
    resetInfo,
    schoolList,
    roleList,
    setSchool,
    setRole
  } = useHeaderReturn

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

  it('Should redirect to `/minhas-turmas`when `Minhas turmas` button is clicked', async () => {
    const { popOverTrigger, findByText } = setup({
      profile: { guid: 'PROFESSOR' }
    })

    fireEvent.click(popOverTrigger)

    const classes = await findByText(/Minhas turmas/i)
    expect(classes).toBeInTheDocument()

    fireEvent.click(classes)
    expect(spyPush).toHaveBeenCalledWith('/minhas-turmas')
  })

  it('Popover should be visible when header`s avatar is clicked', async () => {
    const { popOverTrigger, popOverContent } = setup()

    expect(popOverContent).not.toBeVisible()
    expect(popOverTrigger).toBeInTheDocument()

    fireEvent.click(popOverTrigger)
    await waitFor(() => expect(popOverContent).toBeVisible())
  })

  it.skip('should call `onOpen` function when `Estou com uma dúvida` is clicked', () => {
    const onClick = jest.fn()
    // jest
    //   .spyOn('components', 'Button')
    //   .mockImplementation(() => <button onClick={onClick}>TESTE</button>)
    const { getByText, debug } = setup()
    const help = getByText(/Estou com uma dúvida/i)

    fireEvent.click(help)
    debug()
  })

  it('Should dispatch an `@auth/SIGN_OUT` action when `Sair` is clicked', async () => {
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

  it('Should close Popover when component is on blur or escape (ESC)', async () => {
    const { popOverTrigger, popOverContent, blurEffect } = setup()

    fireEvent.click(popOverTrigger)

    await waitFor(() =>
      expect(popOverContent).toHaveStyle('visibility: visible')
    )

    blurEffect(popOverContent)

    expect(resetInfo).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(popOverContent).toHaveStyle('visibility: hidden')
    )
  })

  it('Should change the `school` on selector when other `school` is triggered', async () => {
    const { popOverTrigger, getByText, findByText } = setup()

    fireEvent.click(popOverTrigger)

    const schoolLabel = defaultValue.school?.label as string
    const school = await findByText(schoolLabel)

    expect(school).toBeInTheDocument()
    reactEvent.openMenu(school)

    const otherSchool = getByText(schoolList[0].label)
    expect(otherSchool).toBeInTheDocument()

    fireEvent.click(otherSchool)

    expect(setSchool).toHaveBeenLastCalledWith({
      label: schoolList[0].label,
      roles: schoolList[0].roles,
      value: schoolList[0].value
    })
  })

  it('Should change the `role` on selector when other `role` is triggered', async () => {
    const { popOverTrigger, getByText, findByText } = setup()

    fireEvent.click(popOverTrigger)

    const roleLabel = defaultValue.role?.label as string
    const selectedRole = await findByText(roleLabel)

    expect(selectedRole).toBeInTheDocument()
    reactEvent.openMenu(selectedRole)

    const coordenador = roleList[1]

    const otherRole = getByText(coordenador.name)
    expect(otherRole).toBeInTheDocument()

    fireEvent.click(otherRole)

    expect(setRole).toHaveBeenLastCalledWith(coordenador)
  })
})
