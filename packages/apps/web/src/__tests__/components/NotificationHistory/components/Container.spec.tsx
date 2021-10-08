import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import { Container as NotificationContainer } from '~/components/NotificationHistory/components'

describe('NotificationContainer should work properly', () => {
  const date = new Date(2021, 11, 11, 9, 10, 14)
  const message = 'message'
  const url = 'url'
  const solutionName = 'solution name'
  it('Should render all elements on screen correctly', () => {
    const { queryByText, getByTestId } = render(
      <NotificationContainer
        isNew={false}
        dataEnvio={date}
        dataExpiracao={date}
        mensagem={message}
        titulo={solutionName}
        url={url}
        origem=""
        id="id"
        icone="icone"
      />
    )

    expect(queryByText(message)).toBeInTheDocument()
    expect(queryByText(solutionName)).toBeInTheDocument()
    expect(queryByText('11/12 às 09:10')).toBeInTheDocument()

    fireEvent.click(getByTestId('menu-button'))

    expect(queryByText('Marcar como não lida')).toBeInTheDocument()
  })

  it('Should render menu list when DotsThreeVertical is clicked', () => {
    const { getByTestId, queryByText } = render(
      <NotificationContainer
        isNew={true}
        dataEnvio={date}
        dataExpiracao={date}
        mensagem={message}
        titulo={solutionName}
        url={url}
        origem=""
        id="id"
        icone="icone"
      />
    )

    fireEvent.click(getByTestId('menu-button'))

    expect(queryByText('Marcar como lida')).toBeInTheDocument()
    expect(queryByText('Excluir')).toBeInTheDocument()
  })
})
