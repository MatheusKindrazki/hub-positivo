import React from 'react'

import { render } from '@psdhub/test-utils'

import Itens, {
  TreeItensProps
} from '../../../../../common/components/Tree/components/Itens'

describe('Itens component should work as expected', () => {
  const mockedProps = {
    parent: {
      label: 'parent-node',
      value: 'parent-value',
      options: [
        {
          label: 'parent-node',
          value: 'parent-value',
          options: [],
          isChecked: 0
        }
      ],
      isChecked: 0
    },
    level: 2,
    isCollapse: true,
    defaultIsOpen: false,
    getCheckbox: jest.fn(),
    getTreeWidget: jest.fn()
  }

  const setup = (props?: Partial<TreeItensProps>) =>
    render(<Itens {...{ ...mockedProps, ...props }} />)

  it('should render without crashing', () => {
    const { getByTestId } = setup()
    expect(getByTestId('collapse-box')).toBeInTheDocument()

    const getCheckboxParams = [
      {
        isChecked: 0,
        label: 'parent-node',
        options: [
          {
            isChecked: 0,
            label: 'parent-node',
            options: [],
            value: 'parent-value'
          }
        ],
        value: 'parent-value'
      }
    ]

    const treeWidgetParams = [
      [
        {
          isChecked: 0,
          label: 'parent-node',
          options: [],
          value: 'parent-value'
        }
      ],
      3
    ]

    expect(mockedProps.getCheckbox).toHaveBeenCalledWith(...getCheckboxParams)
    expect(mockedProps.getTreeWidget).toHaveBeenCalledWith(...treeWidgetParams)
  })

  it('icon should rotate when collapse is open', () => {
    const { getByTestId } = setup({
      defaultIsOpen: true
    })

    expect(getByTestId('collapse-box')).toHaveStyle(
      'transform: rotate(-180deg)'
    )
  })

  it('shouldnt render a collapse box when isCollapse is falsy', () => {
    const { queryAllByTestId } = setup({ isCollapse: false })

    expect(queryAllByTestId('collapse-box')).toEqual([])
  })

  it('shouldnt render a collapse box when parent has no options', () => {
    const { queryAllByTestId } = setup({
      parent: { label: 'optionless parent', value: 'none', options: undefined }
    })

    expect(queryAllByTestId('collapse-box')).toEqual([])
  })

  it('shouldnt render a collapse box when parent options has no length', () => {
    const { queryAllByTestId } = setup({
      parent: { label: 'optionless parent', value: 'none', options: [] }
    })

    expect(queryAllByTestId('collapse-box')).toEqual([])
  })
})
