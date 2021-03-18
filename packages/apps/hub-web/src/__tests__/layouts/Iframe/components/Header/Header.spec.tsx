import React from 'react'

import { render } from '@hub/test-utils'

import Header from '~/layouts/Iframe/components/Header'

jest.mock('~/layouts/Iframe/components/Header/HeaderDesktop', () =>
  jest.fn(() => <span>Header Desktop</span>)
)

jest.mock('~/layouts/Iframe/components/Header/HeaderMobile', () =>
  jest.fn(() => <span>Header Mobile</span>)
)

jest.mock('@hub/common/layout/styles', () => {
  const rest = jest.requireActual('@hub/common/layout/styles')
  return {
    ...rest,
    useMediaQuery: jest
      .fn()
      .mockReturnValueOnce([true])
      .mockReturnValueOnce([false])
  }
})

const setup = () => {
  const handlePush = jest.fn()

  const wrapper = render(<Header handlePush={handlePush} />)
  return { ...wrapper, handlePush }
}

describe('Header`s layout should work properly', () => {
  it('Header should render Desktop Header when useMediaQuery returns [true]', () => {
    const { getByText } = setup()
    const headerMobile = getByText('Header Desktop')
    expect(headerMobile).toBeInTheDocument()
  })

  it('Header should render Mobile Header when useMediaQuery returns [false]', () => {
    const { getByText } = setup()
    const desktopHeader = getByText('Header Mobile')
    expect(desktopHeader).toBeInTheDocument()
  })
})
