import React from 'react'

import { CardProduct } from '~/store/modules/products/types'

import { cards } from '@hub/test-utils/__mocks__'
import { render } from '@hub/test-utils'

import HeaderMobile from '~/layouts/Iframe/components/Header/HeaderMobile'

describe('getting started', () => {
  const setup = () => {
    const handlePush = jest.fn()
    const wrapper = render(
      <HeaderMobile cards={cards as CardProduct[]} handlePush={handlePush} />
    )
    return { ...wrapper, handlePush }
  }
  it('it', () => {
    const { debug } = setup()
    debug()
  })
})
