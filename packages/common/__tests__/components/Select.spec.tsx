import React from 'react'

import selectEvent from 'react-select-event'

import { fireEvent, render } from '@hub/test-utils'

import '@testing-library/jest-dom'
import Select, { PropsSelect } from '../../components/Select'

const mockedProperties: PropsSelect = {
  variant: 'normal',
  placeholder: 'placeholder_test',
  options: [
    { label: 'option1', value: '1' },
    { label: 'option2', value: '2' },
    { label: 'option3', value: '3' }
  ]
}

describe('Select renders without crashing', () => {
  it('Select normal variant render all options', async () => {
    const wrapper = render(<Select {...mockedProperties} />)
    const { getAllByText, getByText } = wrapper
    selectEvent.openMenu(getByText('placeholder_test'))
    const options = getAllByText('option', { exact: false })

    await selectEvent.select(getByText('placeholder_test'), 'option2')
    // Evento de mousedown para alteracao no estilo com state.isSelected
    fireEvent.mouseDown(getByText('option2'))

    expect(options.length).toBe(3)
  })

  it('Select blue-transparent variant render options', async () => {
    mockedProperties.variant = 'blue-transparent'
    const wrapper = render(<Select {...mockedProperties} />)
    const { getAllByText, getByText } = wrapper

    selectEvent.openMenu(getByText('placeholder_test'))
    const options = getAllByText('option', { exact: false })

    await selectEvent.select(getByText('placeholder_test'), 'option2')
    // Evento de mousedown para alteracao no estilo com state.isSelected
    fireEvent.mouseDown(getByText('option2'))

    expect(options.length).toBe(3)
  })

  it('Select displays error message when no options are provided', () => {
    mockedProperties.options = []
    const wrapper = render(<Select {...mockedProperties} />)
    const { getByText } = wrapper

    selectEvent.openMenu(getByText('placeholder_test'))
    const errorMessage = getByText('Nada encontrado =(')

    expect(errorMessage).toBeInTheDocument()
  })
})
