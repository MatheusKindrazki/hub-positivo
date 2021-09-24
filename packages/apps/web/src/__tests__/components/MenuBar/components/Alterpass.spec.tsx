import React from 'react'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@psdhub/test-utils'

import AlterPass from '~/components/MenuBar/components/AlterPass'

import alterPasswordValidate from '~/validators/user/alterPassword'

describe('get started', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  const setup = (CUSTOM_STATE = {} as CustomState<Store.State>) => {
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
    const inputs = wrapper.queryAllByTestId('form-input')
    return {
      ...wrapper,
      onClose,
      inputs,
      cancelButton,
      alterButton,
      queryConfig
    }
  }

  it('Should throw a `validation` error if the form was submitted without any information', async () => {
    const { alterButton, findByText } = setup()

    fireEvent.click(alterButton)

    expect(await findByText(/Campo obrigatório/i)).toBeInTheDocument()
    expect(await findByText(/Senha Obrigatória/i)).toBeInTheDocument()
    expect(
      await findByText(/Confirmação da senha é obrigatória/i)
    ).toBeInTheDocument()
  })

  it('Should throw a `generic` error if an error other than` validation` has been thrown', async () => {
    const { alterButton, findByText, queryConfig } = setup()

    jest.spyOn(alterPasswordValidate, 'validate').mockImplementation(() => {
      throw new Error()
    })
    fireEvent.click(alterButton)

    expect(
      await findByText(
        'Algo deu errado, Verifique seus dados e tente novamente!',
        queryConfig
      )
    ).toBeInTheDocument()
  })

  it('Should call `onClose` function when `CANCELAR` is clicked', async () => {
    const { cancelButton, onClose } = setup()

    fireEvent.click(cancelButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
  it('Should dispatch an `@user/USER_PASSWORD_PANEL_REQUEST` action if the form has been submitted with correct data', async () => {
    const { inputs, alterButton, storeUtils } = setup()

    expect(inputs.length).toBe(3)

    const password = 'password'

    inputs.forEach(input => {
      fireEvent.change(input, { target: { value: password } })
    })
    await waitFor(() => fireEvent.click(alterButton))

    const action = storeUtils?.getActions()
    expect(action).toStrictEqual([
      {
        payload: {
          confirmNewPassword: password,
          newPassword: password,
          oldPassword: password
        },
        type: '@user/USER_PASSWORD_PANEL_REQUEST'
      }
    ])
  })

  it('Should convert input`s type to text when viewPass and viewNewPass are true', async () => {
    const { inputs, getByTestId } = setup()

    inputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'password')
    })

    const passwordView = getByTestId('view-password')
    const newPasswordsView = getByTestId('view-new-password')

    fireEvent.click(passwordView)
    fireEvent.click(newPasswordsView)

    inputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'text')
    })

    const confirmPasswordView = getByTestId('view-confirm-password')
    fireEvent.click(confirmPasswordView)

    expect(inputs[2]).toHaveAttribute('type', 'password')
  })
})
