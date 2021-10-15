import React from 'react'

import * as redux from 'react-redux'

import { render, fireEvent } from '@psdhub/test-utils'

import { Container as NotificationContainer } from '~/components/NotificationHistory/components'

describe('NotificationContainer should work properly', () => {
  jest.spyOn(redux, 'useDispatch').mockImplementation(jest.fn())
  const date = new Date(2021, 11, 11, 9, 10, 14)
  const message = 'message'
  const url = 'url'
  const solutionName = 'solution name'
  it('Should render all elements on screen correctly', () => {
    const { queryByText, getByTestId } = render(
      <NotificationContainer
        isNew={false}
        sentDate={date}
        expirationDate={date}
        message={message}
        title={solutionName}
        url={url}
        origin=""
        id="id"
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
        sentDate={date}
        expirationDate={date}
        message={message}
        title={solutionName}
        url={url}
        origin=""
        id="id"
      />
    )

    fireEvent.click(getByTestId('menu-button'))

    expect(queryByText('Marcar como lida')).toBeInTheDocument()
    expect(queryByText('Excluir')).toBeInTheDocument()
  })
})
