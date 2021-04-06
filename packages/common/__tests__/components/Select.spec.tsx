import React from 'react'

import selectEvent from 'react-select-event'
import { renderHook } from '@testing-library/react-hooks'

import { fireEvent, render } from '@psdhub/test-utils'

import { useTheme } from '../../layout'
import Select, { PropsSelect } from '../../components/Select'

jest.mock('../../layout', () => ({
  useTheme: jest.fn(() => ({
    colors: {
      blue: {
        400: 'DodgerBlue',
        500: 'DeepSkyBlue',
        600: 'LightSkyBlue',
        700: 'SkyBlue'
      }
    },
    shadows: {
      sm: '1px;',
      md: '2px;',
      'dark-lg': '3px;'
    }
  }))
}))

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
  const {
    result: {
      current: { colors }
    }
  } = renderHook(() => useTheme())
  it('Select normal variant render all options', async () => {
    const wrapper = render(<Select {...mockedProperties} />)
    const { getAllByText, getByText, container } = wrapper
    selectEvent.openMenu(getByText('placeholder_test'))
    const options = getAllByText('option', { exact: false })

    options.forEach(option => {
      expect(option).not.toHaveStyle(`background-color: ${colors.blue[500]};`)
    })

    await selectEvent.select(getByText('placeholder_test'), 'option3')
    // Evento de mousedown para alteracao no estilo com state.isSelected
    fireEvent.mouseDown(getByText('option3'))

    const option3 = 2
    const optionSelected = container.getElementsByClassName('hub__option')[
      option3
    ]
    expect(optionSelected).toHaveStyle(`background-color: ${colors.blue[500]};`)
    expect(options.length).toBe(3)
  })

  it('Select blue-transparent variant render options', async () => {
    mockedProperties.variant = 'blue-transparent'
    const wrapper = render(<Select {...mockedProperties} />)

    const { getAllByText, getByText, container } = wrapper

    selectEvent.openMenu(getByText('placeholder_test'))
    const options = getAllByText('option', { exact: false })

    options.forEach(option => {
      expect(option).toHaveStyle(`background-color: ${colors.blue[500]};`)
    })

    await selectEvent.select(getByText('placeholder_test'), 'option2')
    // Evento de mousedown para alteracao no estilo com state.isSelected
    fireEvent.mouseDown(getByText('option2'))

    const option2 = 1
    const optionSelected = container.getElementsByClassName('hub__option')[
      option2
    ]

    expect(optionSelected).toHaveStyle(`background-color: ${colors.blue[400]};`)
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
