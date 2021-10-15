import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { store } from '~/store'

import { render } from '@psdhub/test-utils'

import history from '~/services/history'

import Header from '~/components/Header'

jest.mock('~/components/NotificationHistory/components', () => {
  const rest = jest.requireActual('~/components/NotificationHistory/components')
  return {
    ...rest,
    Dropdown: jest.fn(({ goToSettings, markAllAsRead }) => (
      <div>
        <p>Notificação</p>
        <button onClick={goToSettings} data-testid="settings-button"></button>
        <button
          onClick={markAllAsRead}
          data-testid="mark-all-as-read-button"
        ></button>
      </div>
    ))
  }
})
describe('Header component should works as expected', () => {
  const mockedProps = {
    notifications: {
      notifications: [
        {
          id: 'fake-notification-id',
          title: 'Fake Notification',
          url: 'https://fake-url.com',
          message: 'mensagem teste',
          origin: 'Produto Teste',
          expirationDate: new Date()
        }
      ],
      quantityNewNotifications: 1
    },
    handleGoBack: jest.fn(),
    schoolName: 'test-school'
  }

  const setup = () =>
    render(<Header {...mockedProps} />, {
      store,
      reducers: [
        'educationalStage',
        'profile',
        'user',
        'products',
        'notifications'
      ],
      CUSTOM_STATE: {
        profile: { name: 'Professor' },
        educationalStage: {
          levels: [
            { label: 'level 1', value: 'EF1' },
            { label: 'level 2', value: 'EM' }
          ],
          level: 'EF1'
        },
        notifications: {
          loading: false
        }
      }
    })

  it('should render without crashing', () => {
    const { getByText } = setup()

    const welcomeText = 'test-school'

    expect(getByText(welcomeText, { exact: false })).toBeInTheDocument()
  })
  it('buttons should be rendering without crashing', async () => {
    jest.useFakeTimers()
    const { queryAllByTestId, getByTestId } = setup()
    const headerButtonCount = 3
    const buttonTestId = 'header-button'
    const logoTestId = 'logo-on'
    const notificationHeaderButtonTestIds = [
      'mark-all-as-read-button',
      'settings-button'
    ]

    expect(queryAllByTestId(buttonTestId).length).toBe(headerButtonCount)

    queryAllByTestId(buttonTestId).forEach(button => fireEvent.click(button))
    notificationHeaderButtonTestIds.forEach(testId => {
      fireEvent.click(getByTestId(testId))
    })
    expect(getByTestId(logoTestId)).toBeInTheDocument()
  })
  it('should hide level menu if a solution is open', async () => {
    Object.defineProperty(history, 'location', {
      value: { pathname: '/solucao' }
    })

    const { queryByTestId } = setup()

    const levelMenuTestId = 'educational-level-menu'

    expect(queryByTestId(levelMenuTestId)).toBe(null)
  })
})
