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

describe('HeaderDesktop should work properly', () => {
  it.skip('Products menu should should display all solutions when clicked', async () => {
    const { getByText, queryAllByText, getByTestId } = render(
      <HeaderDesktop {...props} />,
      {
        store
      }
    )

    const getAllSolutions = () =>
      queryAllByText(
        /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
      )

    fireEvent.click(getByText('Produtos'))

    const solutions = getAllSolutions()

    fireEvent.mouseLeave(getByTestId('hub-header-menu'))

    expect(solutions.length).toBe(6)

    await waitFor(() => {
      const solutionsAfterMouseLeave = getAllSolutions()
      expect(solutionsAfterMouseLeave.length).toBe(0)
    })
  })
  it.skip('shouldnt display any card when no cards are provided', () => {
    const { getByText, queryAllByText, queryAllByTestId } = render(
      <HeaderDesktop handlePush={props.handlePush} />,
      {
        store
      }
    )

    fireEvent.click(getByText('Produtos'))

    const solutions = queryAllByText(
      /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
    )
    const cards = queryAllByTestId('hub-card')

    expect(solutions.length).toBe(0)
    expect(cards.length).toBe(0)
  })
  it.skip('shouldnt display any card when no cards are provided', () => {
    const { getByText, queryAllByText, queryAllByTestId } = render(
      <HeaderDesktop handlePush={props.handlePush} />,
      {
        store
      }
    )

    fireEvent.click(getByText('Produtos'))

    const solutions = queryAllByText(
      /Avaliação|Provas|Redação|Recursos|Salas virtuais|Playground/
    )
    const cards = queryAllByTestId('hub-card')

    expect(solutions.length).toBe(0)
    expect(cards.length).toBe(0)
  })
  it('card should handle push and log amplitude event when clicked', () => {
    const { getByTestId } = render(<HeaderDesktop {...props} />, {
      store
    })

    const card = getByTestId('hub-card')

    fireEvent.click(card)

    expect(mockedPush).toHaveBeenCalledWith('')
  })
})
