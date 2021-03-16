import React from 'react'

import selectEvent from 'react-select-event'

import { store } from '~/store'

import { render, fireEvent } from '@hub/test-utils'

import * as chakra from '@chakra-ui/react'

import Filter from '~/pages/Home/components/Filter'

describe('Filter Component (by Welcome) should work properly', () => {
  const CUSTOM_STATE = {
    educationalStage: {
      level: 'EI',
      levels: [
        { label: 'Ensino Infantil', value: 'EI' },
        { label: 'Ensino Fundamental Anos Finais', value: 'EF2' },
        { label: 'Ensino Fundamental Anos Iniciais', value: 'EF1' },
        { label: 'Ensino Médio', value: 'EM' }
      ]
    }
  }

  const { educationalStage } = CUSTOM_STATE

  const setup = ({ profileName }: { profileName: string }) => {
    const utils = render(<Filter />, {
      store,
      reducers: ['profile', 'educationalStage'],
      CUSTOM_STATE: { ...CUSTOM_STATE, profile: { name: profileName } }
    })

    return { ...utils }
  }

  it('The component `Filter` shouldn`t render any level options when profile is not `professor`', () => {
    const { queryAllByText } = setup({ profileName: 'Administrador' })

    const select = queryAllByText(/Ensino/i)

    expect(select).toStrictEqual([])
  })

  it('The component `Filter` should render level options when trigged', () => {
    jest.spyOn(chakra, 'useMediaQuery').mockReturnValue([false])

    const { queryAllByText, getByText } = setup({ profileName: 'Professor' })

    const select = getByText(/Ensino Infantil/i)

    selectEvent.openMenu(select)
    const levels = queryAllByText(/Ensino/i)

    // deve haver 4 ensinos em tela, além do ensino escolhido
    expect(levels.length).toBe(5)
  })

  it('The `Filter` component should show only the chosen option', async () => {
    jest.spyOn(chakra, 'useMediaQuery').mockReturnValue([true])

    const { findAllByText, getByText, queryAllByText, storeUtils } = setup({
      profileName: 'Professor'
    })
    const choice = educationalStage.levels[0].label

    const select = getByText(/Ensino Infantil/i)

    selectEvent.openMenu(select)

    const level = await findAllByText(choice)
    fireEvent.click(level[1])

    const options = queryAllByText(/Ensino/i)
    expect(options.length).toBe(1)

    expect(storeUtils?.getActions()).toStrictEqual([
      { payload: 'EI', type: '@education/SET_LEVEL' },
      { payload: {}, type: '@products/PRODUCT_REQUEST' }
    ])
  })
})
