import React from 'react'

import { store } from '~/store'

import { render, CustomState } from '@hub/test-utils'

import AlterPass from '~/components/Header/components/AlterPass'

describe('get started', () => {
  afterEach(() => jest.clearAllMocks())

  const setup = (CUSTOM_STATE = {} as CustomState) => {
    const onClose = jest.fn()
    const wrapper = render(<AlterPass onClose={onClose} />, {
      store,
      reducers: ['user'],
      CUSTOM_STATE
    })
    return { ...wrapper, onClose }
  }
  it('it', () => {
    const { debug } = setup()
    debug()
  })
})
