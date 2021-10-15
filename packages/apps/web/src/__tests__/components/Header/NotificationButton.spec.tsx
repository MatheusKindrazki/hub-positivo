import React from 'react'

import * as redux from 'react-redux'

import { render, fireEvent, waitFor } from '@psdhub/test-utils'

import NotificationButton from '~/components/Header/components/NotificationButton'

const markAllAsReadButtonText = 'Read All'

jest.mock('~/components/NotificationHistory/components/Dropdown', () =>
  jest.fn(props => (
    <div onClick={() => props.markAllAsRead}>{markAllAsReadButtonText}</div>
  ))
)

describe('NotificationButton should work without crashing', () => {
  const mockedDispatch = jest.fn()
  jest.spyOn(redux, 'useDispatch').mockImplementation(mockedDispatch)

  const mockedProps = {
    notifications: [
      {
        id: 'fakeNotificationId',
        title: 'Fake Notification',
        url: 'https://fake-url.com',
        message: 'this is a fake notification',
        origin: 'inception',
        expirationDate: new Date()
      }
    ],
    quantityNewNotifications: 3
  }

  it('should render', async () => {
    const { getByText, debug } = render(<NotificationButton {...mockedProps} />)

    debug()

    await waitFor(() => fireEvent.click(getByText(markAllAsReadButtonText)))
  })
})
