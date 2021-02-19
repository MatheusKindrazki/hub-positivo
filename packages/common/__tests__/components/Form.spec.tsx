import React from 'react'
import '@testing-library/jest-dom'

import * as unform from '@unform/core'

import { fireEvent, render } from '@hub/test-utils'

import { Form, Input, Button } from '../../components/Form'

const mockedSubmit = jest.fn(props => {
  return props
})

describe('Form works properly', () => {
  it('input should render icons correctly', () => {
    const { getByText } = render(
      <Form onSubmit={mockedSubmit}>
        <Input
          name="test-input"
          iconLeft={<h1>icone teste esquerda</h1>}
          iconRight={<h1>icone teste direita</h1>}
        />
        <Button />
      </Form>
    )

    const iconeEsquerdo = getByText('icone teste esquerda')
    const iconeDireito = getByText('icone teste direita')
    expect(iconeEsquerdo).toBeInTheDocument()
    expect(iconeDireito).toBeInTheDocument()
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

    const inputError = getByTestId('input-error')

    expect(inputError).toBeInTheDocument()
  })

  it('Form calls submit with correct values', () => {
    const mockedResult = {
      'test-input': 'testando'
    }

    const { getByTestId, getByPlaceholderText } = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" placeholder="test-placeholder" />
        <Button />
      </Form>
    )

    const formInput = getByPlaceholderText('test-placeholder')
    const formButton = getByTestId('form-button')

    fireEvent.change(formInput, {
      target: { value: mockedResult['test-input'] }
    })
    fireEvent.focus(formInput)
    fireEvent.blur(formInput)
    fireEvent.click(formButton)

    expect(mockedSubmit.mock.calls[0]).toContainEqual(mockedResult)
  })
})
