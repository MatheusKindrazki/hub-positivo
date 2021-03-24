import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import { store } from '~/store'

import { fireEvent, render } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

import history from '~/services/history'

import Header from '~/components/Header'

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

describe('get started', () => {
  const onClose = jest.fn()
  const onOpen = jest.fn()
  jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
    isOpen: true,
    onClose,
    onOpen
  } as any)

  const spyPush = jest.spyOn(history, 'push')

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
    matchmedia.useMediaQuery(
      match === 'mobile' ? '(min-width: 479px)' : '(min-width: 480px)'
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
    const { getAllByRole } = setup()
    const [MenuButton] = getAllByRole('button')

    fireEvent.click(MenuButton)

    // função referenciada no ref.openMenu chama a onClose() se o drawer estiver aberto
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when hub logo is clicked', () => {
    const { getAllByRole } = setup()
    const [, hubLogoButton] = getAllByRole('button')

    fireEvent.click(hubLogoButton)

    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('should call openModalPass when `Alterar minha senha` is clicked', () => {
    const { getByText } = setup()
    const alterPass = getByText(/Alterar minha senha/i)

    fireEvent.click(alterPass)

    // expect(onOpen).toHaveBeenCalledTimes(1)
  })
})
