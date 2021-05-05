import React from 'react'

import { fireEvent, render } from '@psdhub/test-utils'

import AnimateGoBack from '~/layouts/Iframe/components/Header/AnimateGoBack'

describe('AnimateGoBack should work properly', () => {
  const setup = (width: number | undefined) => {
    const onClick = jest.fn()
    const wrapper = render(<AnimateGoBack onClick={onClick} width={width} />)
    return { ...wrapper, onClick }
  }

  it('Shoud call onClick when arrow left is clicked', async () => {
    const { getAllByRole, onClick } = setup(60)
    const headerButtons = getAllByRole('button')
    const arrowLeft = headerButtons[0]

    fireEvent.click(arrowLeft)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Should render without crashing when width was not provided', async () => {
    const wrapper = setup(undefined)
    expect(wrapper).toMatchSnapshot()
  })
})
