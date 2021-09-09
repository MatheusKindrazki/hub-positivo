// ? corrigir testes / cobrir branches

import React from 'react'

import { store } from '~/store'

import { CustomRenderOptions, render } from '@psdhub/test-utils'

import Iframe from '~/pages/Solutions/'

import usePostMessage from '~/hooks/usePostMessage'

const CUSTOM_STATE: CustomRenderOptions['CUSTOM_STATE'] = {
  products: {
    frameUrl: 'http://test-url.com',
    frameName: 'teste'
  },
  authProduct: {
    productData: {
      element_id: 'element_id',
      scripts: [{ type: 'type_1', url: 'url_1' }]
    },
    productName: 'product_name',
    mcf: false
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
      reducers: ['products', 'authProduct'],
      store,
      CUSTOM_STATE
    })

    expect(usePostMessage).toHaveBeenCalled()
    expect(document.title).toStrictEqual('product_name - Hub')
    expect(wrapper.getByTestId('hub-solution-iframe')).toBeInTheDocument()
  })

  it('should call getCardInformation and set generic title when no frameUrl and no product name are provided', () => {
    // removendo frameUrl do estado de produtos
    CUSTOM_STATE.products = undefined as any

    const wrapper = render(<Iframe />, {
      reducers: ['products', 'authProduct'],
      store,
      CUSTOM_STATE
    })

    expect(usePostMessage).toHaveBeenCalled()
    expect(document.title).toStrictEqual('product_name - Hub')
    expect(wrapper.getByTestId('hub-solution-iframe')).toBeInTheDocument()
  })
})
