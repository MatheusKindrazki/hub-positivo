import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

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

  it('should close the tour when closeButton is clicked', () => {
    tourProps.onClosed = () => {
      tourProps.open = false
      rerender(<Tour {...tourProps} />)
    }
    rerender(<Tour {...tourProps} />)
    const [leftArrow, firstStep, rightArrow, closeButton] = queryAllByRole(
      'button'
    )
    expect(leftArrow).toBeInTheDocument()
    expect(firstStep).toBeInTheDocument()
    expect(rightArrow).toBeInTheDocument()
    expect(closeButton).toBeInTheDocument()

    fireEvent.click(closeButton)

    const content = queryByText(tourProps.steps[0].content)
    expect(content).toBeNull()
    expect(leftArrow).not.toBeInTheDocument()
    expect(firstStep).not.toBeInTheDocument()
    expect(rightArrow).not.toBeInTheDocument()
    expect(closeButton).not.toBeInTheDocument()
  })
})
