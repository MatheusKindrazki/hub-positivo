import React from 'react'

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
        loading: false,
        history: [
          {
            sentDate: Date.now(),
            expireDate: Date.now(),
            message: 'mensagem teste',
            source: 'Produto Teste'
          }
        ]
      }
    }
  ) =>
    render(<Dropdown markAllAsRead={jest.fn()} />, {
      store,
      reducers: ['notifications'],
      CUSTOM_STATE
    })
  it('should render Header and Container', () => {
    const { queryByText, queryAllByText } = setup()

    expect(queryByText('Notification Header')).toBeInTheDocument()
    expect(queryAllByText('Notification Container')).not.toBeNull()
  })
  it('should render proper message when theres no history', () => {
    const { queryByText, queryAllByText } = setup({
      notifications: { loading: false, history: undefined as any }
    })

    expect(queryByText('Notification Header')).toBeInTheDocument()
    expect(queryAllByText('Notification Container')).not.toBeNull()
  })
})
