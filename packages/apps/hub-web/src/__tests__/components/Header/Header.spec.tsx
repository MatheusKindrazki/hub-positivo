import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { render } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

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
  jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
    isOpen: true
  } as any)

  const setup = () => {
    const wrapper = render(<Header />, {
      store,
      reducers: ['tour', 'user', 'profile']
    })

    return { ...wrapper }
  }
  it('Should render Desktop Header when min-width is 480px', () => {
    const matchmedia = new MatchMediaMock()
    matchmedia.useMediaQuery('(min-width: 480px)')

    const { getByTestId } = setup()
    const popOverContent = getByTestId('hub-popover-content')

    expect(popOverContent).toBeInTheDocument()
  })

  it('Should render Mobile Header when min-width is 479px', () => {
    const matchmedia = new MatchMediaMock()
    matchmedia.useMediaQuery('(min-width: 479px)')

    const { getByTestId } = setup()

    const drawerContent = getByTestId('hub-drawer-content')

    expect(drawerContent).toBeInTheDocument()
  })
})
