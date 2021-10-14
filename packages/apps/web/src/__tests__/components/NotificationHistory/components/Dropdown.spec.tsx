import React from 'react'

import { Notification } from '~/store/modules/notifications/types'
import { store } from '~/store'

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
  const setup = (
    CUSTOM_STATE = {
      notifications: {
        loading: false
      }
    },
    messages: Notification[]
  ) =>
    render(<Dropdown markAllAsRead={jest.fn()} messages={messages} />, {
      store,
      reducers: ['notifications'],
      CUSTOM_STATE
    })
  it('should render Header and Container', () => {
    const { queryByText, queryAllByText } = setup(undefined, [
      {
        origin: 'source',
        id: 'fake-id',
        expirationDate: new Date(),
        message: 'fake message',
        title: 'Fake Title',
        url: 'https://fake-url.com',
        new: false,
        sentDate: new Date(Date.now())
      }
    ])

    expect(queryByText('Notification Header')).toBeInTheDocument()
    expect(queryAllByText('Notification Container')).not.toBeNull()
  })
  it('should render proper message when theres no history', () => {
    const { queryByText, queryAllByText } = setup(
      {
        notifications: { loading: false }
      },
      undefined as any
    )

    expect(queryByText('Notification Header')).toBeInTheDocument()
    expect(queryAllByText('Notification Container')).not.toBeNull()
  })
})
