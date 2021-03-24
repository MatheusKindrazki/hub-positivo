import React, { useRef } from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { fireEvent, render } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

import * as Mobile from '~/components/Header/components/Mobile'
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
  jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
    isOpen: true,
    onClose
  } as any)

  const setup = () => {
    const wrapper = render(<Header />, {
      store,
      reducers: ['tour', 'user', 'profile']
    })

    return { ...wrapper }
  }

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
})
