import React from 'react'

import { Megaphone } from 'phosphor-react'

import { fireEvent, render, waitFor } from '@psdhub/test-utils'

import { HeaderButton } from '~/components/Header/components'
describe('HeaderButton component should work as expected', () => {
  it('should trigger onClick', async () => {
    const mockedOnclick = jest.fn()
    const childrenText = 'filho'

    const { getByText } = render(
      <HeaderButton onClick={mockedOnclick}>{childrenText}</HeaderButton>
    )

    expect(getByText(childrenText)).toBeInTheDocument()

    await waitFor(() => fireEvent.click(getByText(childrenText)))

    expect(mockedOnclick).toHaveBeenCalled()
  })
  it('should render icon if received', async () => {
    const mockedOnclick = jest.fn()
    const icon = Megaphone

    const { getByTestId } = render(
      <HeaderButton as={icon} onClick={mockedOnclick} isMenu={true} />
    )
    expect(getByTestId('header-button')).toBeInTheDocument()

    await waitFor(() => fireEvent.click(getByTestId('header-button')))

    expect(mockedOnclick).toHaveBeenCalled()
  })
})
