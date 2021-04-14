import React from 'react'

import { store } from '~/store'

import cards from '@hub/test-utils/__mocks__/cards.mock'
import { fireEvent, render, waitFor } from '@hub/test-utils'

import HeaderDesktop from '~/layouts/Iframe/components/Header/HeaderDesktop'

const mockedPush = jest.fn()

const props = {
  cards,
  handlePush: mockedPush
}

jest.mock('~/services/mixpanel/toolOpened')

describe('HeaderDesktop should work properly', () => {
  it('Products menu should should display all solutions when clicked', async () => {
    const { getByText, queryAllByText, getByTestId } = render(
      <HeaderDesktop {...props} />,

      { store }
    )

    fireEvent.click(getByText('Produtos'))

    const solutions = queryAllByText(
      /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
    )

    fireEvent.mouseLeave(getByTestId('hub-header-menu'))

    expect(solutions.length).toBe(6)

    // checking if menu closes on mouseLeave
    await waitFor(() => {
      const solutionsAfterMouseLeave = queryAllByText(
        /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
      )
      expect(solutionsAfterMouseLeave.length).toBe(0)
    })
  })
  it('shouldnt display any card when no cards are provided', () => {
    const { getByText, queryAllByText } = render(
      <HeaderDesktop handlePush={props.handlePush} />,
      {
        store
      }
    )

    fireEvent.click(getByText('Produtos'))

    const solutions = queryAllByText(
      /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
    )

    expect(solutions.length).toBe(0)
  })
  it('card should handle push when clicked', () => {
    const mockedSolution = {
      nome: 'Provas',
      tipoRenderizacao: 'provas-iframe',
      url: 'psd.provas.com'
    }

    const { getByText } = render(<HeaderDesktop {...props} />, {
      store
    })

    fireEvent.click(getByText('Produtos'))

    const solution = getByText('Provas')

    fireEvent.click(solution)

    expect(mockedPush).toHaveBeenCalledWith(mockedSolution)
  })
})
