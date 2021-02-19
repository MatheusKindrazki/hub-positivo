import React from 'react'

import * as redux from 'react-redux'

import { render, fireEvent } from '@hub/test-utils'

import ModalNoClass from '~/components/ModalNoClass'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(() => jest.fn()),
  useSelector: jest.fn().mockImplementation(() => ({
    withoutAccess: true
  }))
}))

jest.unmock('@hub/common/hooks')

describe('ModalNoClass component', () => {
  it('should trigger the logout action by clicking the exit button', async () => {
    const dispatch = jest.fn()

    jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatch)

    const wrapper = render(<ModalNoClass />)
    const button = wrapper.getByRole('button', { name: /SAIR/i })

    await fireEvent.click(button)

    expect(dispatch).toHaveBeenCalledWith({
      type: '@auth/SIGN_OUT'
    })
  })
  it('Must render the component on screen correctly', () => {
    const wrapper = render(<ModalNoClass />)

    expect(wrapper).toMatchSnapshot()
  })
})
