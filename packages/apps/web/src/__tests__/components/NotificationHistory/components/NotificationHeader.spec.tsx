import React from 'react'

import { fireEvent, render } from '@psdhub/test-utils'

import NotificationHeader from '../../../../components/NotificationHistory/components/NotificationHeader/NotficationHeader'

describe('notifications header should work as expected', () => {
  const mockedMarkAllAsRead = jest.fn()
  const mockedGoToSettings = jest.fn()
  const title = 'test title'
  const props = {
    title: title,
    markAllAsRead: mockedMarkAllAsRead,
    goToSettings: mockedGoToSettings
  }
  const setup = () => render(<NotificationHeader {...props} />)
  it('should render received title', () => {
    const { getByText } = setup()
    expect(getByText('test title')).toBeInTheDocument()
  })

  it('should call received methods', () => {
    const { getByTestId } = setup()
    expect(getByTestId('mark-all-as-read-button')).toBeInTheDocument()
    expect(getByTestId('settings-button')).toBeInTheDocument()

    fireEvent.click(getByTestId('mark-all-as-read-button'))
    fireEvent.click(getByTestId('settings-button'))

    expect(mockedMarkAllAsRead).toHaveBeenCalled()
    expect(mockedGoToSettings).toHaveBeenCalled()
  })
})
