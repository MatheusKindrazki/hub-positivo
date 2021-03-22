import React from 'react'

import { store } from '~/store'

import {
  render,
  CustomState,
  fireEvent,
  waitFor,
  getByRole
} from '@hub/test-utils'
import * as components from '@hub/common/components'

import { ContextHeaderProps } from '~/components/Header/context/types'
import * as header from '~/components/Header/context'
import Desktop from '~/components/Header/components/Desktop'

jest.mock('~/components/Header/context', () => {
  const rest = jest.requireActual('~/components/Header/context')
  return {
    ...rest,
    useHeader: jest.fn().mockReturnValue({
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
    } as ContextHeaderProps)
  }
})

describe('get started', () => {
  const spyUseHeader = jest.spyOn(header, 'useHeader')

  const setup = (CUSTOM_STATE = {} as CustomState) => {
    const openModalPass = jest.fn()
    const wrapper = render(<Desktop openModalPass={openModalPass} />, {
      reducers: ['tour', 'user', 'profile'],
      store,
      CUSTOM_STATE
    })

    wrapper.storeUtils?.clearActions()
    return { ...wrapper }
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

  it.only('Should open popover when header`s avatar is clicked', () => {
    const { getByText, debug } = setup({
      user: {
        user: {
          name: 'Testes Automatizados'
        }
      }
    })

    const avatar = getByText(/TA/i)
    expect(avatar).toBeInTheDocument()

    fireEvent.click(avatar)
    debug()
  })

  it.skip('should call `onOpen` function when `Estou com uma dúvida` is clicked', () => {
    const onClick = jest.fn()
    jest
      .spyOn(components, 'Button')
      .mockImplementation(() => <button onClick={onClick}>TESTE</button>)
    const { getByText, debug } = setup()
    const help = getByText(/Estou com uma dúvida/i)

    fireEvent.click(help)
    debug()
  })
})
