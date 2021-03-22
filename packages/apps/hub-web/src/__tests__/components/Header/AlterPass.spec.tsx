import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent, act } from '@hub/test-utils'

import AlterPass from '~/components/Header/components/AlterPass'

import alterPasswordValidate from '~/validators/user/alterPassword'

describe('get started', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

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

  it('Should throw a `validation` error if the form was submitted without any information', async () => {
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

  it('Should throw a `generic` error if an error other than` validation` has been thrown', async () => {
    const { alterButton, findByText, queryConfig } = setup()

    jest.spyOn(alterPasswordValidate, 'validate').mockImplementation(() => {
      throw new Error()
    })
    fireEvent.click(alterButton)

    const error = await findByText(
      'Algo deu errado, Verifique seus dados e tente novamente!',
      queryConfig
    )

    expect(error).toBeInTheDocument()
  })
})
