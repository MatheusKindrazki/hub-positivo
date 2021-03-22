import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent } from '@hub/test-utils'

import AlterPass from '~/components/Header/components/AlterPass'

describe('get started', () => {
  afterEach(() => jest.clearAllMocks())

  const setup = (CUSTOM_STATE = {} as CustomState) => {
    const onClose = jest.fn()
    const wrapper = render(<AlterPass onClose={onClose} />, {
      store,
      reducers: ['user'],
      CUSTOM_STATE
    })

    const queryConfig = { exact: false }
    const cancel = 'Cancelar'
    const alter = 'Alterar'

    const cancelButton = wrapper.getByText(cancel, queryConfig)
    const alterButton = wrapper.getByText(alter, queryConfig)
    const inputs = wrapper.getAllByTestId('form-input')
    return {
      ...wrapper,
      onClose,
      inputs,
      cancelButton,
      alterButton,
      queryConfig
    }
  }

  it('Should render the correct elements on screen', () => {
    const { inputs, alterButton, cancelButton } = setup()

    expect(inputs.length).toBe(3)
    expect(cancelButton).toBeInTheDocument()

    expect(alterButton).toBeInTheDocument()
  })

  it('You should throw a `validation` error if the form was submitted without any information', async () => {
    const { alterButton, findByText } = setup()

    fireEvent.click(alterButton)

    const passwordError = await findByText(/Campo obrigatório/i)
    const newPasswordError = await findByText(/Senha Obrigatória/i)
    const confirmNewPasswordError = await findByText(
      /Confirmação da senha é obrigatória/i
    )
    expect(passwordError).toBeInTheDocument()
    expect(newPasswordError).toBeInTheDocument()
    expect(confirmNewPasswordError).toBeInTheDocument()
  })
})
