import React from 'react'

import { render } from '@psdhub/test-utils'
import Menu from '@psdhub/common/components/Menu'
import { Airplane } from '@psdhub/common/components/Icons'

const mockedMenuHubProps = {
  title: 'titulo teste',
  children: <div>im a child</div>
}

describe('Menu component should work as expected', () => {
  it('should render menu title and its children', () => {
    const { getByText } = render(<Menu {...mockedMenuHubProps} />)

    expect(getByText('titulo teste')).toBeInTheDocument()
    expect(getByText('im a child')).toBeInTheDocument()
  })

  it('should render a right icon when provided', () => {
    const newProps = {
      ...mockedMenuHubProps,
      rightIcon: Airplane
    }

    const { getByTestId } = render(<Menu {...newProps} />)

    expect(getByTestId('menu-right-icon')).toBeInTheDocument()
  })
})
