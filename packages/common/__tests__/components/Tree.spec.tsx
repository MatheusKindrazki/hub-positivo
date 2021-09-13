import React from 'react'

import { fireEvent, render, waitFor } from '@psdhub/test-utils'
import Tree from '@psdhub/common/components/Tree'

describe('Treeview component works as expected', () => {
  const mockedOnChange = jest.fn()
  const mockedProps = {
    options: [
      {
        label: 'test-node',
        value: 'test-value',
        options: [
          {
            label: 'test-child-node',
            value: 'test-child-value',
            options: [],
            isChecked: 1
          }
        ],
        isChecked: 0
      }
    ],
    onChange: mockedOnChange
  }

  const setup = () => render(<Tree {...mockedProps} />)

  it('renders without crashing', () => {
    const { getByText } = setup()

    expect(getByText('test-node')).toBeInTheDocument()
  })

  it('should call onChange when clicked', async () => {
    const { getByText } = setup()

    expect(getByText('test-node')).toBeInTheDocument()

    await waitFor(() => fireEvent.click(getByText('test-node')))

    const expectedParams = [
      ['test-value', 'test-child-value'],
      [
        {
          isChecked: 1,
          label: 'test-node',
          options: [
            {
              isChecked: 1,
              label: 'test-child-node',
              options: [],
              value: 'test-child-value'
            }
          ],
          value: 'test-value'
        }
      ]
    ]

    expect(mockedOnChange).toHaveBeenCalledWith(...expectedParams)
  })
})
