import React, { useRef } from 'react'

import { renderHook } from '@testing-library/react-hooks'

import * as redux from 'react-redux'

import { render, fireEvent, waitFor, act } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import ModalAddCategory, { ModalHandler } from '~/components/ModalAddCategory'

import categoryValidator from '~/validators/accessControl/newCategory'

describe('ModalNoClass component should work properly', () => {
  const dispatch = jest.fn()
  const onClose = jest.fn()
  const onOpen = jest.fn()

  beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)
    jest.spyOn(hooks, 'useDisclosure').mockReturnValue({
      isOpen: true,
      onClose,
      onOpen
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should trigger the create category action by clicking the /adicionar/ button', async () => {
    const spyValidate = jest.spyOn(categoryValidator, 'validate')
    spyValidate.mockImplementation(jest.fn())

    const wrapper = render(<ModalAddCategory />)
    const input = wrapper.getByTestId('modal-addCategory')

    fireEvent.change(input, { target: { value: 'Categoria' } })
    const button = wrapper.getByText(/ADICIONAR/, { exact: true })
    await waitFor(() => fireEvent.click(button))

    expect(dispatch).toHaveBeenCalledWith({
      payload: { nome: 'Categoria' },
      type: '@category/CATEGORY_POST_REQUEST'
    })
  })

  it('should call onOpen through reference ', () => {
    const {
      result: { current: ref }
    } = renderHook(() => useRef<ModalHandler>())
    render(<ModalAddCategory ref={ref as any} />)

    ref.current?.onOpen()

    expect(onOpen).toHaveBeenCalled()
  })

  it('should throw a validation error when category name is not provided', async () => {
    const wrapper = render(<ModalAddCategory />)

    const button = wrapper.getByText(/ADICIONAR/, { exact: true })
    await act(async () => {
      await waitFor(() => fireEvent.click(button))
    })

    expect(
      await wrapper.findByText(/O nome da categoria é obrigatório/i)
    ).toBeInTheDocument()
  })

  it('should throw a error when something is wrong', async () => {
    const spyValidate = jest.spyOn(categoryValidator, 'validate')
    spyValidate.mockImplementation(() => {
      throw new Error()
    })

    const wrapper = render(<ModalAddCategory />)

    const button = wrapper.getByText(/ADICIONAR/, { exact: true })
    await waitFor(() => fireEvent.click(button))

    expect(
      await wrapper.findByText(/Algo deu errado, tente novamente!/i)
    ).toBeInTheDocument()
  })

  it('should render without crashing on mobile screen', async () => {
    jest.spyOn(hooks, 'useMediaQuery').mockReturnValue([true])

    const wrapper = render(<ModalAddCategory />)

    expect(wrapper).toMatchSnapshot()
  })
})
