import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@hub/test-utils'

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
  it('Shoud dispatch a `@tour/OPEN_TOUR` action when `Fazer tour` button in clicked', async () => {
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

  it('should dispatch an ` test ` action when `Estou com uma dúvida` is clicked', () => {
    const { getByText } = setup()
    const help = getByText(/Estou com uma dúvida/i)

    fireEvent.click(help)
  })
})
