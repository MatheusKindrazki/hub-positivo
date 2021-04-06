import React from 'react'

import { render, fireEvent, waitFor } from '@hub/test-utils'

import Tour, { TourProps } from '../../components/Tour'

const tourProps: TourProps = {
  steps: [{ selector: '#seletor', content: 'content' }],
  open: true,
  onClosed: jest.fn()
}

describe('Testing Tour component and your functionalities', () => {
  const wrapper = render(<Tour {...tourProps} />)
  const { queryByText, queryAllByRole, rerender } = wrapper

  it('Should render Tour component with first step', () => {
    const content = queryByText(tourProps.steps[0].content)
    expect(content).toBeInTheDocument()
  })

  it('should close the tour when closeButton is clicked', async () => {
    tourProps.onClosed = () => {
      tourProps.open = false
      rerender(<Tour {...tourProps} />)
    }
    rerender(<Tour {...tourProps} />)
    const buttons = queryAllByRole('button')

    buttons.forEach(element => expect(element).toBeInTheDocument())

    fireEvent.click(buttons[3])

    const content = queryByText(tourProps.steps[0].content)
    await waitFor(() => expect(content).toBeNull())

    buttons.forEach(element => expect(element).not.toBeInTheDocument())
  })
})
