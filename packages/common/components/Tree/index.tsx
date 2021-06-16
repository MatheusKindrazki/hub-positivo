import React, { useState, useEffect, useCallback } from 'react'

import { Checkbox, Stack } from '@chakra-ui/react'

import { handleClickParents, getObjectValues, setDefaultValues } from './utils'

export interface TreeNode {
  label: string
  value: string
  options?: Array<TreeNode>
  isChecked?: number
}

interface Props {
  options: Array<TreeNode>
  prefixIgnore?: string
  defaultOptions?: string[]
  onChange?: (checked: string[], raw: Array<TreeNode>) => void
}

const CustomTreeView: React.FC<Props> = ({
  options,
  defaultOptions,
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
    return options.map((parent: TreeNode) => (
      <>
        {getCheckbox(parent)}
        {parent.options && (
          <Stack pl={6} mt={1} spacing={1}>
            {getTreeWidget(parent.options)}
          </Stack>
        )}
      </>
    ))
  }

  return <>{getTreeWidget(data)}</>
}

export default CustomTreeView
