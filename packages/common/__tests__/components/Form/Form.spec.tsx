import React from 'react'

import * as unform from '@unform/core'

import { fireEvent, render } from '@psdhub/test-utils'

import { Form, Input, Button } from '../../../components/Form'

const mockedSubmit = jest.fn(props => {
  return props
})

describe('Form works properly', () => {
  it('input should render icons correctly and change style when focused', () => {
    const wrapper = render(
      <Form onSubmit={mockedSubmit}>
        <Input
          name="test-input"
          placeholder="testholder"
          iconLeft={<h1>icone teste esquerda</h1>}
          iconRight={<h1>icone teste direita</h1>}
        />
        <Button />
      </Form>
    )
    const { queryByText, getByTestId } = wrapper

    const iconeEsquerdo = queryByText('icone teste esquerda')
    const iconeDireito = queryByText('icone teste direita')

    const formInput = getByTestId('form-input')
    expect(iconeEsquerdo).not.toBeNull()
    expect(iconeDireito).not.toBeNull()

    // testar se componente muda a cor da borda quando focado e desfocado
    formInput.focus()
    expect(formInput).toHaveFocus()
    expect(wrapper).toMatchSnapshot()

    formInput.blur()
    expect(formInput).not.toHaveFocus()
    expect(wrapper).toMatchSnapshot()
  })

  it('input should display an error if useField returns error as truthy', () => {
    // mock do useField para retornar erro
    const useFieldSpy = jest.spyOn(unform, 'useField')
    useFieldSpy.mockReturnValueOnce({
      fieldName: 'test-input',
      registerField: jest.fn(),
      defaultValue: 'teste',
      clearError: jest.fn(),
      error: 'true'
    })

    const { getByTestId } = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" />
        <Button />
      </Form>
    )

    expect(getByTestId('input-error')).toBeInTheDocument()
  })

  it('Form calls submit with correct values', () => {
    const mockedResult = {
      'test-input': 'testando'
    }

    const { getByTestId, getByPlaceholderText } = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" placeholder="testholder" />
        <Button />
      </Form>
    )

    const formInput = getByPlaceholderText('testholder')
    const formButton = getByTestId('form-button')

    fireEvent.change(formInput, {
      target: { value: mockedResult['test-input'] }
    })
    fireEvent.click(formButton)

    expect(mockedSubmit.mock.calls[0]).toContainEqual(mockedResult)
  })
})
