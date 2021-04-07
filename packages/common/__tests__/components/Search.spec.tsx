import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import Search from '../../components/Search'

jest.mock('../../components/Icons', () => ({
  MagnifyingGlass: jest.fn().mockImplementation(() => <>Lupa</>)
}))

describe('Search component should work properly', () => {
  it('Input should call onChange with correct value', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(<Search onChange={onChange} />)

    const value = 'test input value'
    const searchInput = getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value } })
    expect(onChange).toHaveBeenCalledWith(value)
  })
})
