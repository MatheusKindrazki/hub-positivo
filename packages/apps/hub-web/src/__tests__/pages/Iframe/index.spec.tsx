import React from 'react'

import { store } from '~/store'

import { render } from '@hub/test-utils'

import Iframe from '~/pages/Iframe/'

import usePostMessage from '~/hooks/usePostMessage'

const CUSTOM_STATE = {
  products: {
    frameUrl: 'http://test-url.com',
    frameName: 'teste'
  }
}

jest.mock('~/hooks/usePostMessage', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('iframe should work as expected', () => {
  afterEach(jest.clearAllMocks)

  it('should call postMessage Hook, set document title, and render a dynamic iframe', () => {
    const wrapper = render(<Iframe />, {
      reducers: ['products'],
      store,
      CUSTOM_STATE
    })

    expect(usePostMessage).toHaveBeenCalled()
    expect(document.title).toStrictEqual('teste - Hub')
    expect(wrapper.getByTestId('hub-solution-iframe')).toBeInTheDocument()
  })

  it('should call getCardInformation and set generic title when no frameUrl and no product name are provided', () => {
    // removendo frameUrl do estado de produtos
    CUSTOM_STATE.products = undefined as any

    const wrapper = render(<Iframe />, {
      reducers: ['products'],
      store,
      CUSTOM_STATE
    })

    expect(usePostMessage).toHaveBeenCalled()
    expect(document.title).toStrictEqual('Soluções - Hub')
    expect(wrapper.getByTestId('hub-solution-iframe')).toBeInTheDocument()
  })
})
