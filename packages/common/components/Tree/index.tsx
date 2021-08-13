import React, { useState, useEffect, useCallback } from 'react'

import { handleClickParents, getObjectValues, setDefaultValues } from './utils'
import { Container } from './styles'
import TreeItens from './components/Itens'
import Text, { TextProps } from '../Text'
import Checkbox from '../Checkbox'

export interface TreeNode {
  label: string
  value: string
  options?: Array<TreeNode>
  isChecked?: number
}

export interface Props {
  options: Array<TreeNode>
  prefixIgnore?: string
  isCollapse?: boolean
  size?: 'sm' | 'md' | 'lg'
  fontSize?: TextProps['fontSize']
  defaultIsOpen?: boolean
  defaultOptions?: string[]
  onChange?: (checked: string[], raw: Array<TreeNode>) => void
}

const CustomTreeView: React.FC<Props> = props => {
  const {
    options,
    isCollapse,
    defaultIsOpen,
    defaultOptions,
    prefixIgnore,
    onChange
  } = props

  const [data, setData] = useState<Array<TreeNode>>([])

  useEffect(() => {
    setDefaultValues(defaultOptions, options)

    setData(options)
  }, [options, defaultOptions])

  const handleCheckedValue = useCallback(
    values => {
      onChange && onChange(getObjectValues(values, prefixIgnore), data)
    },
    [data, onChange, prefixIgnore]
  )

  const getCheckbox = (item: TreeNode) => {
    if (!item.isChecked) {
      item.isChecked = 0
    }

    const onClickParent = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation()

      handleClickParents(data, item)

      setData([...data])
      handleCheckedValue([...data])
    }

    return (
      <Checkbox
        size={props.size || 'lg'}
        isChecked={item.isChecked === 1}
        isIndeterminate={![0, 1].includes(item.isChecked)}
        onChange={e => onClickParent(e)}
      >
        <Text color="black" fontSize={props.fontSize}>
          {item.label}
        </Text>
      </Checkbox>
    )
  }

  const getTreeWidget = (options: Array<TreeNode>, level: number) => {
    return options.map((parent: TreeNode, index: number) => (
      <TreeItens
        key={index}
        level={level}
        parent={parent}
        getCheckbox={getCheckbox}
        getTreeWidget={getTreeWidget}
        isCollapse={isCollapse}
        defaultIsOpen={defaultIsOpen}
      />
    ))
  }

  return <Container>{getTreeWidget(data, 1)}</Container>
}

export default CustomTreeView