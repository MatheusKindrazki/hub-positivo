import React from 'react'

import * as redux from 'react-redux'

import history from '~/services/history'

import ExpiredToken from '~/pages/Auth/ExpiredToken'

import { renderWithContext } from '~/hub-test-utils'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

describe('Expired Token page should work properly', () => {
  it('debug', () => {
    // const spyPush = jest.spyOn(history, 'push')
    // const wrapper = renderWithContext(<ExpiredToken />, {
    //   forgotPassword: {
    //     validateViewPin: true
    //   }
    // })
    // const { getByText } = wrapper
    // expect(spyPush).toHaveBeenCalledWith('a')
  })
})
