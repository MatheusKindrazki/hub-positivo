import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import { store } from '~/store'

import { fireEvent, render, CustomRenderOptions } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'
import * as drawer from '@psdhub/common/components/Drawer'

import history from '~/services/history'

import * as Mobile from '~/components/Header/components/Mobile'
import Header from '~/components/Header'

jest.mock('~/components/Header/components/Mobile', () => {
  const rest = jest.requireActual('~/components/Header/components/Mobile')
  return {
    __esModule: true,
    ...rest,
    default: jest.fn()
  }
})

jest.mock('~/components/Header/components/Desktop', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>DesktopMenu</div>
    }
  }
})

jest.mock('react-router', () => {
  const rest = jest.requireActual('react-router')
  return {
    ...rest,
    useHistory: jest.fn(() => ({
      location: {
        pathname: '/'
      }
    }))
  }
})
describe('Header component ', () => {
  const spyDrawerDisclosure = () => {
    const drawerOnClose = jest.fn()
    const drawerOnOpen = jest.fn()

    jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onClose: drawerOnClose,
      onOpen: drawerOnOpen
    } as any)

    return { drawerOnClose, drawerOnOpen }
  }

  const spyHookDisclosure = () => {
    const hookOnClose = jest.fn()
    const hookOnOpen = jest.fn()

    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onClose: hookOnClose,
      onOpen: hookOnOpen
    } as any)

    return { hookOnClose, hookOnOpen }
  }
  beforeAll(() => {
    spyDrawerDisclosure()
    spyHookDisclosure()
  })

  const setup = (CUSTOM_STATE?: CustomRenderOptions['CUSTOM_STATE']) => {
    const wrapper = render(<Header />, {
      store,
      reducers: ['tour', 'user', 'profile', 'auth', 'noBreakAccess'],
      CUSTOM_STATE
    })

    return { ...wrapper }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  const handleClick = jest.fn()

  jest.spyOn(Mobile, 'default').mockImplementation(
    ({ openModalPass }) =>
      (
        <button
          onClick={() => {
            openModalPass()
          }}
        >
          MobileMenu
        </button>
      ) as any
  )
  jest.spyOn(Mobile, 'MenuButton').mockImplementation(
    ({ onClick = handleClick }) =>
      (
        <button
          onClick={() => {
            onClick()
            // mock responsável por verificarmos de onClick foi chamada
            handleClick()
          }}
        >
          MenuButton
        </button>
      ) as any
  )
  const useMediaMock = (match: 'mobile' | 'desktop') => {
    const matchmedia = new MatchMediaMock()
    return matchmedia.useMediaQuery(
      match === 'mobile' ? '(min-width: 470px)' : '(min-width: 480px)'
    )
  }

  it('Should render Desktop Header when min-width is 480px', () => {
    useMediaMock('desktop')

    const { queryByText } = setup({
      noBreakAccess: { nobreak: false },
      auth: { signed: true }
    })

    expect(queryByText('DesktopMenu')).toBeInTheDocument()
  })

  it('Should render Mobile Header when min-width is 479px', () => {
    useMediaMock('mobile')

    const { queryByText } = setup({
      noBreakAccess: { nobreak: false },
      auth: { signed: true }
    })

    const mobileMenu = queryByText('MobileMenu')

    expect(mobileMenu).not.toBeNull()
  })

  it('Should call handleClick when MenuButton is clicked', () => {
    useMediaMock('mobile')
    const { getAllByRole } = setup({
      noBreakAccess: { nobreak: false },
      auth: { signed: true }
    })
    const [MenuButton] = getAllByRole('button')

    fireEvent.click(MenuButton)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when hub logo is clicked', () => {
    const spyPush = jest.spyOn(history, 'push')

    const { getAllByRole } = setup({
      noBreakAccess: { nobreak: false },
      auth: { signed: true }
    })
    const [, hubLogoButton] = getAllByRole('button')
    fireEvent.click(hubLogoButton)

    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should call openModalPass when `Alterar minha senha` is clicked', async () => {
    const { hookOnOpen } = spyHookDisclosure()
    useMediaMock('mobile')

    const { getByText } = setup()
    const simulateOpenModalPass = getByText(/MobileMenu/i)

    fireEvent.click(simulateOpenModalPass)

    expect(hookOnOpen).toHaveBeenCalledTimes(1)
  })

  it('Should not render DesktopMenu when /nobreak/ is true and enableMenu is false', async () => {
    useMediaMock('desktop')

    const { queryByText } = setup({
      noBreakAccess: { nobreak: true }
    })
    const mobileMenu = queryByText('MobileMenu')

    expect(mobileMenu).toBeInTheDocument()
  })
})
