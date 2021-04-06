import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import { store } from '~/store'

import { fireEvent, render, waitFor } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'
import * as drawer from '@psdhub/common/components/Drawer'

import history from '~/services/history'

import Header from '~/components/Header'

// jest.mock('@psdhub/common/hooks', () => {
//   const rest = jest.requireActual('@psdhub/common/hooks')
//   return { ...rest, useDisclosure: jest.fn(() => ({ isOpen: true })) }
// })

// jest.mock('@psdhub/common/components/Drawer', () => {
//   const rest = jest.requireActual('@psdhub/common/components/Drawer')
//   return { ...rest, useDisclosure: jest.fn() }
// })

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

  const setup = () => {
    const wrapper = render(<Header />, {
      store,
      reducers: ['tour', 'user', 'profile']
    })

    return { ...wrapper }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  const useMediaMock = (match: 'mobile' | 'desktop') => {
    const matchmedia = new MatchMediaMock()
    return matchmedia.useMediaQuery(
      match === 'mobile' ? '(min-width: 470px)' : '(min-width: 480px)'
    )
  }

  it('Should render Desktop Header when min-width is 480px', () => {
    useMediaMock('desktop')
    const { getByTestId } = setup()
    const popOverContent = getByTestId('hub-popover-content')

    expect(popOverContent).toBeInTheDocument()
  })

  it('Should render Mobile Header when min-width is 479px', () => {
    useMediaMock('mobile')

    const { getByTestId } = setup()
    const drawerContent = getByTestId('hub-drawer-content')

    expect(drawerContent).toBeInTheDocument()
  })

  it('Should call handleClick when MenuButton is clicked', () => {
    useMediaMock('mobile')
    const { drawerOnClose } = spyDrawerDisclosure()

    const { getAllByRole } = setup()
    const [MenuButton] = getAllByRole('button')

    fireEvent.click(MenuButton)

    // função referenciada no ref.openMenu chama a onClose() se o drawer estiver aberto
    expect(drawerOnClose).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when hub logo is clicked', () => {
    const spyPush = jest.spyOn(history, 'push')

    const { getAllByRole } = setup()
    const [, hubLogoButton] = getAllByRole('button')

    fireEvent.click(hubLogoButton)

    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should call openModalPass when `Alterar minha senha` is clicked', async () => {
    const { hookOnOpen } = spyHookDisclosure()

    const { getByText } = setup()
    const alterPass = getByText(/Alterar minha senha/i)

    fireEvent.click(alterPass)

    await waitFor(() => expect(hookOnOpen).toHaveBeenCalledTimes(1))
  })
})
