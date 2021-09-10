// ? corrigir testes / cobrir branches

import React from 'react'

import { store } from '~/store'

import {
  CustomRenderOptions,
  render,
  waitFor,
  fireEvent
} from '@psdhub/test-utils'

import Solution from '~/pages/Solutions/'

import usePostMessage from '~/hooks/usePostMessage'
import * as hook from '~/hooks/useCardInformation'

jest.mock('~/hooks/useCardInformation', () => jest.fn())

const CUSTOM_STATE: CustomRenderOptions['CUSTOM_STATE'] = {
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

  it('should call postMessage Hook, set document title, and render a dynamic iframe', async () => {
    const wrapper = render(<Solution />, {
      reducers: ['authProduct'],
      store,
      CUSTOM_STATE
    })

    const iframe = wrapper.getByTestId('hub-solution-iframe')
    iframe.onload = jest.fn()
    fireEvent.load(iframe)

    expect(iframe.onload).toHaveBeenCalled()
    expect(usePostMessage).toHaveBeenCalled()
    expect(document.title).toStrictEqual('product_name - Hub')
    expect(wrapper.getByTestId('hub-solution-iframe')).toBeInTheDocument()
  })

  it('should call getCardInformation and set generic title when there are not authProduct', async () => {
    const spyGetCardInformation = jest.spyOn(hook, 'default')

    render(<Solution />, {
      reducers: ['authProduct'],
      store,
      CUSTOM_STATE: {
        authProduct: {}
      }
    })
    await waitFor(() => expect(spyGetCardInformation).toHaveBeenCalled())
    expect(document.title).toStrictEqual('Carregando Solução - Hub')
  })
})
