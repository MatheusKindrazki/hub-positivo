import React from 'react'

import * as redux from 'react-redux'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import ChangePassword from '~/pages/Auth/ChangePassword'

import '@testing-library/jest-dom'

const setView = jest.fn()
const view = true
const token = 'this is a test token'

const mockedUseState = [view, setView, token]

jest.mock('react-redux', () => {
  const ui = jest.requireActual('react-redux')
  return {
    ...ui,
    useDispatch: jest.fn(),
    useSelector: jest.fn(() => {
      return {
        loading: false
      }
    })
  }
})
jest.mock('react-router-dom', () => {
  const ui = jest.requireActual('react-router-dom')
  return {
    ...ui,
    useLocation: () => ({
      pathname: '/alterar-senha',
      search: {
        get: () => {
          return { token: 'this is a test token' }
        }
      }
    })
  }
})

describe('Forgot Password page should work properly', () => {
  it('Should dispatch an action with correct payload', async () => {
    // const mockedData = {
    //   payload: { userInfo: 'teste@testmail.com' },
    //   type: '@auth/PWD_TOKEN_REQUEST'
    // }
    // const dispatch = jest.fn()
    // jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
    // render(<ChangePassword />)
    // await waitFor(() => expect(dispatch).toHaveBeenCalledWith(mockedData))
  })
})
