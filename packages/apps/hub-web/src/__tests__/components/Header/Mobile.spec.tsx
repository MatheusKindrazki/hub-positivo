import React, { useRef } from 'react'

import reactEvent from 'react-select-event'
import { renderHook } from '@testing-library/react-hooks'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@hub/test-utils'

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

  const setup = (CUSTOM_STATE = { ...userState } as CustomState) => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<RefMenuProps>(null))
    const openModalPass = jest.fn()
    // const handleClick
    const wrapper = render(
      <>
        {/* <MenuButton onClick={handleClick} /> */}
        <MobileMenu openModalPass={openModalPass} ref={ref} />
      </>,
      {
        reducers: ['tour', 'user', 'profile'],
        store,
        CUSTOM_STATE
      }
    )
    ref.current?.openMenu()

    const blurEffect = (element: HTMLElement): boolean =>
      fireEvent.keyDown(element, { key: 'Esc', code: 27 })

    wrapper.storeUtils?.clearActions()
    return { ...wrapper, blurEffect, ref }
  }
  it('it', () => {
    const { debug } = setup()
    debug()
  })
})
