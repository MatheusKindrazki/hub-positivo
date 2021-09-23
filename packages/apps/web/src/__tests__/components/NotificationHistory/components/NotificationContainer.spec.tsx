import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import NotificationContainer from '~/components/NotificationHistory/components/NotificationContainer'

describe('NotificationContainer should work properly', () => {
  const date = new Date(2021, 11, 11, 9, 10, 14)
  const message = 'message'
  const url = 'url'
  const solutionName = 'solution name'
  it('Should render all elements on screen correctly', () => {
    const { queryByText, getByTestId } = render(
      <NotificationContainer
        read={false}
        date={date}
        imageURL={url}
        message={message}
        solutionName={solutionName}
      />
    )

    expect(queryByText(message)).toBeInTheDocument()
    expect(queryByText(solutionName)).toBeInTheDocument()
    expect(queryByText('11/12 às 09:10')).toBeInTheDocument()

    fireEvent.click(getByTestId('menu-button'))

    expect(queryByText('Marcar como lida')).toBeInTheDocument()
    expect(queryByText('Desativar notificações como essa')).toBeInTheDocument()
  })

  it('Should render menu list when DotsThreeVertical is clicked', () => {
    const { getByTestId, queryByText } = render(
      <NotificationContainer
        read={true}
        date={date}
        imageURL={url}
        message={message}
        solutionName={solutionName}
        allowThisTypeOf={false}
      />
    )

    fireEvent.click(getByTestId('menu-button'))

    expect(queryByText('Marcar como não lida')).toBeInTheDocument()
    expect(queryByText('Ativar notificações como essa')).toBeInTheDocument()
    expect(queryByText('Excluir')).toBeInTheDocument()
  })
})
