import React from 'react'

import selectEvent from 'react-select-event'

import { store } from '~/store'

import { render, fireEvent, CustomState } from '@hub/test-utils'

import Profile from '~/pages/Auth/Profile'

jest.mock('react', () => {
  const ui = jest.requireActual('react')
  return {
    ...ui,
    useQuery: jest.fn(() => ({
      get: jest.fn()
    }))
  }
})

jest.mock('react-router-dom', () => {
  const rest = jest.requireActual('react-router-dom')
  return {
    ...rest,
    useLocation: () => ({
      pathname: '/login',
      search: {
        get: (redirect: string) => redirect
      }
    })
  }
})

describe('Profile page should work properly', () => {
  const school = {
    id: 'school_id',
    roles: ['ADMINISTRADOR', 'COORDENADOR', 'PROFESSOR'],
    name: 'school_name'
  }

  const CUSTOM_STATE: CustomState = {
    user: {
      user: {
        schools: [school]
      }
    }
  }

  const selectPlaceholder = 'Selecione'

  const setup = () => {
    const utils = render(<Profile />, {
      store,
      reducers: ['user'],
      CUSTOM_STATE
    })

    const select = utils.getByText(selectPlaceholder)
    return { ...utils, select }
  }

  it('Should render the correct elements on the screen', async () => {
    const { getByText, select } = setup()

    const selectTitle = getByText(/Selecione sua escola e acesso/i)

    expect(selectTitle).toBeInTheDocument()
    expect(select).toBeInTheDocument()
  })

  it('The component `Select` should work correctly when the user interacts with it', async () => {
    const { findByText, select } = setup()

    selectEvent.openMenu(select)

    const schoolName = await findByText(school.name)
    expect(schoolName).toBeInTheDocument()
  })

  it('The `Profile` component should dispatch `@auth/FIRST_ACCESS` when the user chooses an option', async () => {
    const { getByText, findByText, storeUtils } = setup()

    const { roles } = school

    const select = getByText(selectPlaceholder)

    selectEvent.openMenu(select)

    const schoolName = await findByText(school.name)

    fireEvent.click(schoolName)

    roles.forEach(role => {
      const element = getByText(role, { exact: false })
      expect(element).toBeInTheDocument()
    })

    const [administrador] = roles
    const roleElement = getByText(administrador, { exact: false })

    fireEvent.click(roleElement)

    const actionTypeSubmit = '@auth/FIRST_ACCESS'

    const dispatchedActionType = storeUtils?.getActions()[0]
    expect(dispatchedActionType.type).toBe(actionTypeSubmit)
  })
})
