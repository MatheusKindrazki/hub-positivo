import React, { useState, useEffect, useCallback } from 'react'

import { handleClickParents, getObjectValues, setDefaultValues } from './utils'
import TreeItens from './components/Itens'
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
  defaultOptions?: string[]
  onChange?: (checked: string[], raw: Array<TreeNode>) => void
}

const CustomTreeView: React.FC<Props> = ({
  options,
  defaultOptions,
  isCollapse,
  prefixIgnore,
  onChange
}: Props) => {
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
        isChecked={item.isChecked === 1}
        isIndeterminate={![0, 1].includes(item.isChecked)}
        onChange={e => onClickParent(e)}
      >
        {item.label}
      </Checkbox>
    )
  }

  const getTreeWidget = (options: Array<TreeNode>) => {
    return options.map((parent: TreeNode, index: number) => (
      <TreeItens
        key={index}
        parent={parent}
        getCheckbox={getCheckbox}
        getTreeWidget={getTreeWidget}
        isCollapse={isCollapse}
      />
    ))
  }

  return <>{getTreeWidget(data)}</>
}

export default CustomTreeView
