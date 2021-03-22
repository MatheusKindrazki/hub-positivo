import React from 'react'

import { store } from '~/store'

import { render, CustomState } from '@hub/test-utils'

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

    const inputs = wrapper.getAllByRole('input')
    return { ...wrapper, onClose, inputs, queryConfig }
  }
  it('Should render the correct elements on screen', () => {
    const { inputs, getByText, queryConfig } = setup()

    const title = 'Alterar Senha'
    const cancel = 'Cancelar'
    const alter = 'Alterar'

    const titleElement = getByText(title, queryConfig)
    const cancelButton = getByText(cancel, queryConfig)
    const alterButton = getByText(alter, queryConfig)

    expect(inputs.length).toBe(3)
    expect(titleElement).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()

    expect(alterButton).toBeInTheDocument()
  })
})
