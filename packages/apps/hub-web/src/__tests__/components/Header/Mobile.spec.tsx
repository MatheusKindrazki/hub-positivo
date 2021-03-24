import React, { useRef } from 'react'

import reactEvent from 'react-select-event'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor, act } from '@hub/test-utils'
import * as drawer from '@hub/common/components/Drawer'

import { UseDisclosureProps } from '@chakra-ui/react'

import history from '~/services/history'

import * as header from '~/components/Header/context'
import MobileMenu, {
  RefMenuProps,
  MenuButton
} from '~/components/Header/components/Mobile'

import { useHeaderReturn, userState } from '~/__mocks__/HeaderContext'

jest.mock('~/services/history', () => ({
  push: jest.fn()
}))

jest.mock('~/components/Header/context', () => {
  const rest = jest.requireActual('~/components/Header/context')
  return {
    ...rest,
    useHeader: jest.fn()
  }
})

jest.mock('react-router', () => {
  const rest = jest.requireActual('react-router')
  return {
    ...rest,
    useHistory: jest.fn(() => ({
      location: '/'
    }))
  }
})

describe('Mobile Header component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  jest.spyOn(header, 'useHeader').mockReturnValue(useHeaderReturn)

  const spyPush = jest.spyOn(history, 'push')

  const spyUseDisclosure = (alterations: Partial<UseDisclosureProps>): void => {
    const {
      result: { current }
    } = renderHook(() => drawer.useDisclosure())
    jest.spyOn(drawer, 'useDisclosure').mockReturnValue({
      ...current,
      ...alterations
    })
  }

  const useDisclosureFunctions = {
    onClose: jest.fn(),
    onOpen: jest.fn(),
    isOpen: true
  }

  beforeEach(() => {
    spyUseDisclosure(useDisclosureFunctions)
  })

  const setup = (CUSTOM_STATE = { ...userState } as CustomState) => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<RefMenuProps>(null))

    const openModalPass = jest.fn()

    const handleMenuClick = jest.fn(() => {
      act(() => {
        ref.current?.openMenu()
      })
    })

    const wrapper = render(
      <>
        <MenuButton onClick={handleMenuClick} />
        <MobileMenu openModalPass={openModalPass} ref={ref} />
      </>,
      {
        reducers: ['tour', 'user', 'profile'],
        store,
        CUSTOM_STATE
      }
    )

    const blurEffect = (element: HTMLElement): boolean =>
      fireEvent.keyDown(element, { key: 'Esc', code: 27 })

    const [menuButton] = wrapper.getAllByRole('button')
    wrapper.storeUtils?.clearActions()
    return { ...wrapper, blurEffect, handleMenuClick, ref, menuButton }
  }

  it('openMenu should call onOpen when isOpen is false', () => {
    const onOpen = jest.fn()
    spyUseDisclosure({ onOpen, isOpen: false })

    const { handleMenuClick, menuButton } = setup()

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('openMenu should call onClose when isOpen is true', () => {
    const { handleMenuClick, menuButton } = setup()

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
  })

  it('Should redirect to `/` when `Sair` button is clicked', () => {
    const { getByText } = setup()

    const exitButton = getByText(/Sair/i)
    expect(exitButton).toBeInTheDocument()

    fireEvent.click(exitButton)

    expect(spyPush).toHaveBeenCalledWith('/')
  })

  it('Should open a Tour (dispatch a `@tour/OPEN_TOUR` action) when /Fazer tour/ button is clicked', () => {
    const { getByText, storeUtils } = setup({
      tour: {
        steps: [
          { content: 'content', position: 'right', selector: '#selector' }
        ]
      }
    })
    const tourButton = getByText(/Fazer tour/i)
    fireEvent.click(tourButton)

    const action = storeUtils?.getActions()

    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
    expect(action).toStrictEqual([
      {
        payload: {
          open: true
        },
        type: '@tour/OPEN_TOUR'
      }
    ])
  })

  it('Should call  useDisclosure`s onClose function when key of escape is pressed (ESC)', () => {
    const { getByTestId } = setup()
    const drawerContent = getByTestId('hub-drawer-content')

    fireEvent.keyDown(drawerContent, { key: 'Esc', code: 27 })

    expect(useDisclosureFunctions.onClose).toHaveBeenCalledTimes(1)
  })
})
