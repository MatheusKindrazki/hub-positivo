import React from 'react'

import { fireEvent, render } from '@psdhub/test-utils'

import AnimateGoBack from '../../../components/Header/components/AnimateGoBack'

describe('AnimateGoBack should work properly', () => {
  const setup = () => {
    const onClick = jest.fn()
    const wrapper = render(<AnimateGoBack onClick={onClick} />)
    return { ...wrapper, onClick }
  }

  it('Shoud call onClick when arrow left is clicked', async () => {
    const { getAllByRole, onClick } = setup()
    const headerButtons = getAllByRole('button')
    const arrowLeft = headerButtons[0]

    fireEvent.click(arrowLeft)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Should render without crashing when width was not provided', async () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
