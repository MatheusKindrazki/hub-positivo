import React, { useContext } from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'
import { renderHook } from '@testing-library/react-hooks'

import { fireEvent, render } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import context from '~/components/ModalSupport/context'
import ModalSupport from '~/components/ModalSupport'

jest.mock('~/components/ModalSupport/cerebro.svg', () =>
  jest.fn(() => <>Cerebro</>)
)

describe('ModalSupport component testing', () => {
  const setup = () => {
    const wrapper = render(<ModalSupport />)
    return { ...wrapper }
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Should redirect to FAQ when `ACESSAR FAQ` button is clicked', () => {
    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true
    } as any)

    const open = jest.spyOn(window, 'open').mockImplementation(() => null)

    const { getByText } = setup()
    const FAQButton = getByText(/ACESSAR FAQ/i)

    fireEvent.click(FAQButton)

    expect(open).toHaveBeenCalledWith(
      'https://suporte.positivoon.com.br/portal/pt/home',
      '_blank'
    )
  })

  it('Context onClose when ModalSupport`s close button is triggered', () => {
    const onClose = jest.fn()
    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onClose
    } as any)

    const { getAllByRole } = setup()
    const [closeButton] = getAllByRole('button')

    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('Context`s onClose and onOpen should call useDisclosure`s functions', () => {
    const onClose = jest.fn()
    const onOpen = jest.fn()
    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onClose,
      onOpen
    } as any)

    const {
      result: { current }
    } = renderHook(() => useContext(context))

    setup()

    current.onClose()
    current.onOpen()

    expect(onOpen).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  it('Should toMatchSnapShot', () => {
    const matchmedia = new MatchMediaMock()
    matchmedia.useMediaQuery('(min-width: 480px)')
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
