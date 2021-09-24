import React, { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import * as reactReduxHooks from 'react-redux'

import { fireEvent, render } from '@psdhub/test-utils'
import * as Drawer from '@psdhub/common/components/Drawer'

import history from '~/services/history'

import Menu, { RefMenuProps } from '~/components/MenuBar/components/Desktop'

import store from '~/__mocks__/fakeStore.mock'

jest.mock('~/components/MenuBar/components', () => {
  const rest = jest.requireActual('~/components/MenuBar/components')
  return {
    ...rest,
    MenuHeader: jest.fn(() => <div>Header</div>),
    SelectProfile: jest.fn(() => <div>Select profile</div>),
    MenuFooter: jest.fn(({ handleSignOut }) => (
      <button onClick={handleSignOut}>MenuFooter</button>
    )),
    Submenu: jest.fn(() => <div>Submenu</div>),
    Skeleton: jest.fn(() => <div>Skeleton</div>)
  }
})

jest.mock('@psdhub/common/components/Drawer', () => {
  const rest = jest.requireActual('@psdhub/common/components/Drawer')
  return {
    __esModule: true,
    ...rest,
    default: jest.fn(({ children }) => <div>{children}</div>),
    useDisclosure: jest.fn(() => ({
      onOpen: jest.fn(),
      onClose: jest.fn(),
      isOpen: true
    })),
    DrawerOverlay: jest.fn(() => <div>DrawerOverlay</div>),
    DrawerContent: jest.fn(({ children }) => <div>{children}</div>)
  }
})

jest.mock('~/services/history', () => ({
  __esModule: true,
  default: {
    push: jest.fn()
  }
}))

jest.mock('~/components/MenuBar/context', () => {
  const rest = jest.requireActual('~/components/MenuBar/context')
  return {
    ...rest,
    useHeader: jest.fn(() => ({
      resetInfo: jest.fn()
    }))
  }
})

describe('Menu should work properly', () => {
  const setup = (CUSTOM_STATE?: object) => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<RefMenuProps>(null))
    const openModalPass = jest.fn()
    const openModalVersionUpdate = jest.fn()

    const wrapper = render(
      <Menu
        openModalPass={openModalPass}
        openModalVersionUpdate={jest.fn()}
        ref={ref}
      />,
      {
        store,
        reducers: ['products', 'user'],
        CUSTOM_STATE
      }
    )
    return { openModalVersionUpdate, openModalPass, ref, ...wrapper }
  }
  it('Should render the correct elements on screen', () => {
    const { queryByText } = setup()
    expect(queryByText(/DrawerOverlay/i)).toBeInTheDocument()
    expect(queryByText(/Header/i)).toBeInTheDocument()
    expect(queryByText(/Select profile/i)).toBeInTheDocument()
    expect(queryByText(/MenuFooter/i)).toBeInTheDocument()
  })

  it.skip('Should call handleSignOut when logout`s button is clicked', () => {
    const dispatch = jest.fn()
    jest
      .spyOn(reactReduxHooks, 'useDispatch')
      .mockImplementation(() => dispatch)
    const spyPush = jest.spyOn(history, 'push')
    jest.useFakeTimers()
    const { getByText } = setup()

    fireEvent.click(getByText(/MenuFooter/i))
    jest.runAllTimers()

    expect(dispatch).toHaveBeenCalledWith({ type: '@auth/SIGN_OUT' })
    expect(spyPush).toHaveBeenCalledWith('/login')
  })

  it.skip('Should call onClose through ref`s openMenu when isOpen is true', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { ref } = setup()

    jest
      .spyOn(Drawer, 'useDisclosure')
      .mockImplementation(() => ({ onOpen, onClose, isOpen: true } as any))

    ref.current?.openMenu()
    expect(onClose).toHaveBeenCalledWith()
  })

  it.skip('Should call onOpen through ref`s openMenu when isOpen is false', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { ref } = setup()

    jest
      .spyOn(Drawer, 'useDisclosure')
      .mockImplementation(() => ({ onOpen, onClose, isOpen: false } as any))

    ref.current?.openMenu()
    expect(onOpen).toHaveBeenCalledWith()
  })
})
