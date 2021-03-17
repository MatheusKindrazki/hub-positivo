import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import * as redux from 'react-redux'

import { store } from '~/store'

import { render, fireEvent } from '@hub/test-utils'

import ModalNoClass from '~/components/ModalNoClass'

jest.unmock('@hub/common/hooks')

describe('ModalNoClass component', () => {
  it('should trigger the logout action by clicking the exit button', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const wrapper = render(<ModalNoClass />, {
      store: store,
      reducers: ['auth'],
      CUSTOM_STATE: {
        auth: {
          withoutAccess: true
        }
      }
    })

    const button = wrapper.getByRole('button', { name: /SAIR/i })

    await fireEvent.click(button)

    expect(dispatch).toHaveBeenCalledWith({
      type: '@auth/SIGN_OUT'
    })
  })

  it('Must render the component on screen correctly', () => {
    const wrapper = render(<ModalNoClass />, {
      store: store,
      reducers: ['auth'],
      CUSTOM_STATE: {
        auth: {
          withoutAccess: true
        }
      }
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('Render the component in the Desktop version', async () => {
    const matchmedia = new MatchMediaMock()

    matchmedia.useMediaQuery('(min-width: 480px)')

    const wrapper = render(<ModalNoClass />, {
      store: store,
      reducers: ['auth'],
      CUSTOM_STATE: {
        auth: {
          withoutAccess: true
        }
      }
    })

    const button = wrapper.getByTestId('modal-button-closed')

    await fireEvent.click(button)

    expect(wrapper).toMatchSnapshot()
  })

  it('The component should not be on screen', async () => {
    const wrapper = render(<ModalNoClass />, {
      store: store,
      reducers: ['auth'],
      CUSTOM_STATE: {
        auth: {
          withoutAccess: false
        }
      }
    })

    wrapper.debug()

    expect(wrapper).toBeDefined()
  })
})
