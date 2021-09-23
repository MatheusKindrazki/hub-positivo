import React from 'react'

import { render } from '@psdhub/test-utils'

import NotificationContainer from '~/components/NotificationHistory/components/NotificationContainer'

describe('NotificationContainer should work properly', () => {
  it('Should render all elements on screen correctly', () => {
    const date = new Date(2021, 11, 11, 9, 10, 14)
    const message = 'message'
    const url = 'url'
    const solutionName = 'solution name'
    const { queryByText } = render(
      <NotificationContainer
        date={date}
        imageURL={url}
        message={message}
        solutionName={solutionName}
      />
    )

    expect(queryByText(message)).toBeInTheDocument()
    expect(queryByText(solutionName)).toBeInTheDocument()
    expect(queryByText('11/12 às 09:10')).toBeInTheDocument()
  })
})
