import React from 'react'

import { openMenu } from 'react-select-event'
import MatchMediaMock from 'jest-matchmedia-mock'

import { store } from '~/store'

import { render, fireEvent } from '@hub/test-utils'
import * as styles from '@hub/common/layout/styles'

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

  const useMedia = (size: number) => {
    const matchmedia = new MatchMediaMock()
    return matchmedia.useMediaQuery(`(min-width: ${size})`)
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
    const { queryAllByText, getByText } = setup({ profileName: 'Professor' })

    const select = getByText(/Ensino Infantil/i)

    openMenu(select)
    const levels = queryAllByText(/Ensino/i)

    // deve haver 4 ensinos em tela, além do ensino escolhido
    expect(levels.length).toBe(5)
  })

  it('The `Filter` component should show only the chosen option', async () => {
    const { findAllByText, getByText, queryAllByText, storeUtils } = setup({
      profileName: 'Professor'
    })
    const choice = educationalStage.levels[0].label

    const select = getByText(/Ensino Infantil/i)

    openMenu(select)

    const level = await findAllByText(choice)
    fireEvent.click(level[1])

    const options = queryAllByText(/Ensino/i)
    expect(options.length).toBe(1)

    expect(storeUtils?.getActions()).toStrictEqual([
      { payload: 'EI', type: '@education/SET_LEVEL' },
      { payload: {}, type: '@products/PRODUCT_REQUEST' }
    ])
  })

  it('Filter`s Box should have 1.25rem on margin-bottom when mediaQuery returns [true]', () => {
    jest.spyOn(styles, 'useMediaQuery').mockReturnValue([true])
    const { getByTestId } = setup({ profileName: 'Professor' })

    const box = getByTestId('filter-box')
    expect(box).toHaveStyle('margin-bottom: 1.25rem')
  })

  it('Filter`s Box should have 0px on margin-bottom when mediaQuery returns [false]', () => {
    jest.spyOn(styles, 'useMediaQuery').mockReturnValue([false])

    const { getByTestId } = setup({ profileName: 'Professor' })
    const box = getByTestId('filter-box')
    expect(box).toHaveStyle('margin-bottom: 0px')
  })
})
