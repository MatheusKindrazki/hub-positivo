import React from 'react'

import { store } from '~/store'

import { render, CustomState } from '@hub/test-utils'

import history from '~/services/history'

import ExpiredToken from '~/pages/Auth/ExpiredToken'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

describe('Expired Token page should work properly', () => {
  const CUSTOM_STATE: CustomState = {
    forgotPassword: {
      validateViewPin: false
    }
  }
  it('debug', () => {
    const spyPush = jest.spyOn(history, 'push')
    render(<ExpiredToken />, {
      store,
      reducers: ['forgotPassword'],
      CUSTOM_STATE
    })
    // const { getByText } = wrapper
    expect(spyPush).toHaveBeenCalledWith('/')
  })
})
