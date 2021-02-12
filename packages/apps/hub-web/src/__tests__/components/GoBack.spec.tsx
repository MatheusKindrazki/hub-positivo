import React from 'react'

import { render, fireEvent } from '@hub/test-utils'

import GoBack from '~/components/GoBack'

describe('Goback component', () => {
  it('should render on screen and when clicking trigger an event', async () => {
    const handleGoBackMocked = jest.fn()

    const wrapper = render(<GoBack onClick={handleGoBackMocked}>Render</GoBack>)

    const { getByTestId } = wrapper

    const button = getByTestId('goback-button')

    await fireEvent.click(button)
    expect(wrapper).toMatchSnapshot()

    expect(wrapper.container.innerHTML).toContain('Render')

    expect(handleGoBackMocked).toHaveBeenCalled()
  })
})
