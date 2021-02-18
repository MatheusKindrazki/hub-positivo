import React from 'react'
import '@testing-library/jest-dom'

import * as unform from '@unform/core'

import { fireEvent, render } from '@hub/test-utils'

import { Form, Input, Button } from '../../components/Form'

const childrenValue = 'correct inner html'

const mockedSubmit = jest.fn(props => {
  return props
})

describe('Form works properly', () => {
  it('Form chama submit com value inserido no Input atraves do Button', () => {
    const wrapper = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" type="text" placeholder="teste" />
        <Button />
      </Form>
    )
    const { getByTestId, getByPlaceholderText } = wrapper
    const mockedResult = {
      'test-input': 'testando'
    }

    const formInput = getByPlaceholderText('teste')
    const formButton = getByTestId('form-button')

    fireEvent.change(formInput, { target: { value: 'testando' } })
    fireEvent.blur(formInput)
    fireEvent.click(formButton)

    expect(mockedSubmit.mock.calls[0]).toContainEqual(mockedResult)
  })

  it('input lida com blur e focus', () => {
    const wrapper = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" type="text" placeholder="teste" />
        <Button>{childrenValue}</Button>
      </Form>
    )
    const { getByPlaceholderText } = wrapper

    const formInput = getByPlaceholderText('teste')

    fireEvent.blur(formInput)
    fireEvent.focus(formInput)
  })

  it('input deve mostrar erro caso useField retorn error como true', () => {
    const useFieldSpy = jest.spyOn(unform, 'useField')

    useFieldSpy.mockReturnValueOnce({
      fieldName: 'test-input',
      registerField: jest.fn(),
      defaultValue: 'teste',
      clearError: jest.fn(),
      error: 'true'
    })

    const wrapper = render(
      <Form onSubmit={mockedSubmit}>
        <Input name="test-input" type="text" placeholder="teste" />
        <Button>{childrenValue}</Button>
      </Form>
    )

    const { getByTestId } = wrapper

    const inputError = getByTestId('input-error')

    expect(inputError).toBeInTheDocument()
  })

  it('input deve renderizar icones corretamente', () => {
    const wrapper = render(
      <Form onSubmit={mockedSubmit}>
        <Input
          name="test-input"
          type="text"
          placeholder="teste"
          iconLeft={<h1>icone teste esquerda</h1>}
          iconRight={<h1>icone teste direita</h1>}
        />
        <Button>{childrenValue}</Button>
      </Form>
    )

    const { getByText } = wrapper

    const iconeEsquerdo = getByText('icone teste esquerda')
    const iconeDireito = getByText('icone teste direita')
    expect(iconeEsquerdo).toBeInTheDocument()
    expect(iconeDireito).toBeInTheDocument()
  })
})
