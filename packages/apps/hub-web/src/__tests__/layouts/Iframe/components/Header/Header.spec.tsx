import React from 'react'

import { fireEvent, render } from '@hub/test-utils'

import history from '~/services/history'

import * as HeaderMobile from '~/layouts/Iframe/components/Header/HeaderMobile'
import * as HeaderDesktop from '~/layouts/Iframe/components/Header/HeaderDesktop'
import * as AnimateGoBack from '~/layouts/Iframe/components/Header/AnimateGoBack'
import Header from '~/layouts/Iframe/components/Header/'

jest.mock('@hub/common/layout/styles', () => {
  const rest = jest.requireActual('@hub/common/layout/styles')
  return {
    ...rest,
    useMediaQuery: jest
      .fn()
      .mockReturnValueOnce([false])
      .mockReturnValue([true])
  }
})

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

jest.mock('~/layouts/Iframe/components/Header/HeaderMobile', () => jest.fn())
jest.mock('~/layouts/Iframe/components/Header/HeaderDesktop', () => jest.fn())

jest.mock('~/layouts/Iframe/components/Header/AnimateGoBack', () =>
  jest.fn(() => <></>)
)

describe('Header`s layout should work properly', () => {
  const setup = () => {
    const wrapper = render(<Header handlePush={jest.fn()} cards={[]} />)
    return { ...wrapper }
  }
  it('Header should render Mobile Header when useMediaQuery returns [false]', () => {
    const mobile = 'Header Mobile'

    jest
      .spyOn(HeaderMobile, 'default')
      .mockImplementation(jest.fn(() => <span>{mobile}</span>))

    const { getByText } = setup()
    const Header = getByText(mobile)
    expect(Header).toBeInTheDocument()
  })
  it('Header should render Desktop Header when useMediaQuery returns [true]', () => {
    const desktop = 'Header Desktop'

    jest
      .spyOn(HeaderDesktop, 'default')
      .mockImplementation(jest.fn(() => <span>{desktop}</span>))

    const { getByText } = setup()
    const Header = getByText(desktop)
    expect(Header).toBeInTheDocument()
  })

  it('Should call the go back handler when a GoBack is clicked', () => {
    const goBack = 'Go Back'
    jest
      .spyOn(AnimateGoBack, 'default')
      .mockImplementation(
        jest.fn(({ onClick }) => <button onClick={onClick}>{goBack}</button>)
      )
    const spyPush = jest.spyOn(history, 'push')

    const { getAllByRole } = setup()
    const headerButtons = getAllByRole('button')
    const goBackButton = headerButtons[0]

    fireEvent.click(goBackButton)
    expect(spyPush).toHaveBeenLastCalledWith('/')
  })
})
