import React from 'react'

import { fireEvent, render, waitFor } from '@psdhub/test-utils'

import AllValues, {
  AllValuesProps
} from '../../../../../components/NewSelect/components/Variants/Checkbox/components/AllValues'

describe('AllValues should works as expected', () => {
  const setup = (props: AllValuesProps) => render(<AllValues {...props} />)

  const mockedHandleClick = jest.fn()

  const getMockedProps = () => ({
    index: 1,
    isChecked: ['1', '2', '3'],
    values: [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' }
    ],
    text: 'this is a test text',
    handleClick: mockedHandleClick as any
  })

  afterEach(() => jest.clearAllMocks())

  it('should render received text', () => {
    const mockedProps = getMockedProps()
    const { getByText } = setup(mockedProps)
    expect(getByText('this is a test text')).toBeInTheDocument()
  })
  it('should handle onClick event', async () => {
    const mockedProps = getMockedProps()
    const { getByText } = setup(mockedProps)
    await waitFor(() => fireEvent.click(getByText('this is a test text')))
    expect(mockedHandleClick).toHaveBeenCalledWith([], true)
  })
  it('should render default text when no text is received', () => {
    const newProps = getMockedProps()
    newProps.text = undefined as any
    const defaultText = 'Selecionar todos'
    const { getByText } = setup(newProps)
    expect(getByText(defaultText)).toBeInTheDocument()
  })
  it('should work when no values are received', () => {
    const newProps = getMockedProps()
    newProps.values = undefined as any
    const { getByText } = setup(newProps)
    expect(getByText('this is a test text')).toBeInTheDocument()
  })
  it('should handle select all', async () => {
    const newProps = getMockedProps()
    newProps.isChecked = []
    const expectedInput = [
      {
        label: 'one',
        value: '1'
      },
      {
        label: 'two',
        value: '2'
      },
      {
        label: 'three',
        value: '3'
      }
    ]

    const { getByText } = setup(newProps)
    await waitFor(() => fireEvent.click(getByText('this is a test text')))
    expect(mockedHandleClick).toHaveBeenCalledWith(expectedInput, true)
  })
})
