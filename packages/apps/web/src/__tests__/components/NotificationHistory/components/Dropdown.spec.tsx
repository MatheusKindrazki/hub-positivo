import React from 'react'

import { render } from '@psdhub/test-utils'

import { Dropdown } from '~/components/NotificationHistory/components'

jest.mock('~/components/NotificationHistory/components', () => {
  const rest = jest.requireActual('~/components/NotificationHistory/components')
  return {
    ...rest,
    Header: jest.fn(() => <span>Notification Header</span>),
    Container: jest.fn(() => <span>Notification Container</span>)
  }
})

describe('History of notifications in Dropdown should work as expected', () => {
  const setup = () =>
    render(<Dropdown goToSettings={jest.fn()} markAllAsRead={jest.fn()} />)
  it('should render received title', () => {
    const { debug, queryByText } = setup()

    expect(queryByText('Notification Header')).toBeInTheDocument()
    expect(queryByText('Notification Container')).toBeInTheDocument()

    debug()
  })
})
