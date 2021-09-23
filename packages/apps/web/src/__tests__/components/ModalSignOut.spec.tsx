import React, { useRef } from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'
import { renderHook } from '@testing-library/react-hooks'

import * as redux from 'react-redux'

import { render, fireEvent } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import ModalSignOut, {
  ModalHandler
} from '~/components/ModalSignOut/ModalSignOut'

jest.unmock('@psdhub/common/hooks')

describe('ModalSignOut component should work properly', () => {
  it('should trigger the logout action by clicking the exit button', async () => {
    const dispatch = jest.fn()
    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn()
    } as any)
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const { getByText } = render(<ModalSignOut />)

    expect(getByText('SAIR')).toBeInTheDocument()

    await fireEvent.click(getByText('SAIR'))

    expect(dispatch).toHaveBeenCalledWith({
      type: '@auth/SIGN_OUT'
    })
  })

  it('Must render the component on screen correctly', () => {
    const wrapper = render(<ModalSignOut />)

    expect(wrapper).toMatchSnapshot()
  })

  it('Render the component in the Desktop version', async () => {
    const matchmedia = new MatchMediaMock()

    matchmedia.useMediaQuery('(min-width: 480px)')

    const wrapper = render(<ModalSignOut />)

    const button = wrapper.getByTestId('modal-button-closed')

    await fireEvent.click(button)

    expect(wrapper).toMatchSnapshot()
  })

  it('should be able to trigger onOpen with ref', async () => {
    const mockedOnOpen = jest.fn()

    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: false,
      onOpen: mockedOnOpen,
      onClose: jest.fn()
    } as any)

    const {
      result: { current: ref }
    } = renderHook(() => useRef<ModalHandler>())
    render(<ModalSignOut ref={ref as any} />)

    ref.current?.onOpen()

    expect(mockedOnOpen).toHaveBeenCalled()
  })
})
