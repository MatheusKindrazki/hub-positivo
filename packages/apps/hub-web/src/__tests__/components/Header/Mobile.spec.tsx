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

    wrapper.storeUtils?.clearActions()
    return { ...wrapper, blurEffect, handleMenuClick, ref }
  }

  it('openMenu should call onOpen when isOpen is false', () => {
    const onOpen = jest.fn()
    spyUseDisclosure({ onOpen, isOpen: false })

    const { handleMenuClick, getByRole } = setup()
    const menuButton = getByRole('button')

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('openMenu should call onClose when isOpen is true', () => {
    const onClose = jest.fn()

    spyUseDisclosure({ onClose, isOpen: true })

    const { handleMenuClick, getAllByRole } = setup()
    const [menuButton] = getAllByRole('button')

    fireEvent.click(menuButton)

    expect(handleMenuClick).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
