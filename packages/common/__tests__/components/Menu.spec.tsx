import React from 'react'

import { render } from '@psdhub/test-utils'
import { Airplane } from '@psdhub/common/components/Icons'

import Menu from '../../../common/components/Menu'

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
