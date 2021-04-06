import React from 'react'

import { fireEvent, render } from '@hub/test-utils'

import Search from '~/layouts/Iframe/components/Search'

describe('should work properly', () => {
  const setup = () => {
    const handleChange = jest.fn()
    const wrapper = render(<Search handleChange={handleChange} />)
    const placeholderValue = 'Buscar soluções'
    const input = wrapper.getByPlaceholderText(placeholderValue)

    return { ...wrapper, handleChange, placeholderValue, input }
  }
  it('Should render an input on screen', () => {
    expect(setup().input).toBeInTheDocument()
  })

  it('Should call onChange handler when a value is triggered on input', () => {
    jest.useFakeTimers()

    const { input, handleChange } = setup()
    const searchValue = 'testing value'

    fireEvent.change(input, { target: { value: searchValue } })
    jest.runAllTimers()

    expect(handleChange).toHaveBeenCalledWith(searchValue)
  })

  it('Should render without crashing', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })
})
