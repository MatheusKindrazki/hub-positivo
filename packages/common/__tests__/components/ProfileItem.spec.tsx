import React from 'react'

import { render } from '@psdhub/test-utils'
import ProfileItem, { Icons } from '@psdhub/common/components/ProfileItem'
const mockedMenuHubProps = {
  title: 'titulo teste',
  icon: 'professor' as Icons
}

describe('Menu component should work as expected', () => {
  it('should render profile item without crashing', () => {
    const { getByText, getByTestId } = render(
      <ProfileItem {...mockedMenuHubProps} />
    )

    expect(getByText('titulo teste')).toBeInTheDocument()
    expect(getByTestId('profile-item-icon')).toBeInTheDocument()
  })

  it('should render default icon when provided icon property isnt from a real profile', () => {
    const newProps = {
      ...mockedMenuHubProps,
      icon: undefined as unknown as Icons
    }

    const { getByTestId } = render(<ProfileItem {...newProps} />)

    expect(getByTestId('profile-item-icon')).toBeInTheDocument()
  })
})
