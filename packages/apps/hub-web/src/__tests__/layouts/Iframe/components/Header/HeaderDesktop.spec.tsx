import React from 'react'

import amplitude from 'amplitude-js'

import { store } from '~/store'

import cards from '@psdhub/test-utils/__mocks__/cards.mock'
import { fireEvent, render, waitFor } from '@psdhub/test-utils'

import HeaderDesktop from '~/layouts/Iframe/components/Header/HeaderDesktop'

const mockedPush = jest.fn()

const props = {
  cards,
  handlePush: mockedPush
}

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    logEvent: jest.fn()
  })
}))

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
  it('card should handle push and log amplitude event when clicked', () => {
    const mockedSolution = {
      nome: 'Provas',
      tipoRenderizacao: 'provas-iframe',
      url: 'psd.provas.com'
    }
    const eventName = 'Tool Opened'
    const eventProperties = { card_name: 'Provas', location: 'header' }
    const instance = amplitude.getInstance()
    const { logEvent } = instance
    const { getByText } = render(<HeaderDesktop {...props} />, {
      store
    })

    fireEvent.click(getByText('Produtos'))

    const solution = getByText('Provas')

    fireEvent.click(solution)

    expect(mockedPush).toHaveBeenCalledWith(mockedSolution)
    expect(logEvent).toHaveBeenCalledWith(eventName, eventProperties)
  })
})
