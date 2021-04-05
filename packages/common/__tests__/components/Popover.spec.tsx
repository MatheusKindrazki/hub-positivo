import React from 'react'

import { fireEvent, render, waitFor } from '@hub/test-utils'

import Popover, {
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '../../components/Popover'
import Button from '../../components/Button'

const phrase = 'Are you sure you want to have that milkshake?'
const PopoverComponent = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>{phrase}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

describe('Popover component should work properly', () => {
  it('Should render with correctly content', () => {
    const { queryByText } = render(<PopoverComponent />)
    const content = queryByText(phrase)

    expect(content).not.toBeNull()
  })

  it('Should close visibility of the Popover when close button is clicked', async () => {
    const { getByText, getByRole } = render(<PopoverComponent />)
    const button = getByRole('button', { name: /trigger/i })
    const content = getByText(phrase)

    fireEvent.click(button)

    await waitFor(() => {
      expect(content).not.toBeVisible()
    })
  })
})
