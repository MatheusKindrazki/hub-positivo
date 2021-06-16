import React, { useState, useEffect, useCallback } from 'react'

import { Checkbox, Stack } from '@chakra-ui/react'

import { getChecked, setChecked } from './utils/getObject'

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
    if (defaultOptions) {
      const checkedOptions = setChecked(defaultOptions, options)

      setData(checkedOptions)
      return
    }

    setData(options)
  }, [options, defaultOptions])

  const handleCheckedValue = useCallback(
    values => {
      onChange && onChange(getChecked(values, prefixIgnore), data)
    },
    [data, onChange, prefixIgnore]
  )

  const changeNode = (
    nodeData: Array<TreeNode>,
    item: TreeNode,
    state: number
  ) => {
    for (let i = 0; i < nodeData.length; i++) {
      if (nodeData[i].value === item.value) {
        nodeData[i].isChecked = state
        return
      }
      if (nodeData[i].options) {
        changeNode(nodeData[i].options || [], item, state)
      }
    }
  }

  const onChildClick = (item: TreeNode, state: number) => {
    changeNode(data, item, state)

    if (item.options) {
      item.options.forEach(child => {
        onChildClick(child, state)
      })
    }
  }

  const onGetPath = (data: Array<TreeNode>, item: TreeNode) => {
    let i
    for (i = 0; i < data.length; i++) {
      if (data[i].value === item.value) {
        return [i]
      }
      if (data[i].options) {
        const res: any = onGetPath(data[i].options || [], item)
        if (res) {
          return [i, ...res]
        }
      }
    }
    return null
  }

  const onSetCheckParent = (
    data: Array<TreeNode>,
    deep: number,
    path: Array<number>
  ) => {
    let head: TreeNode = {
      label: '',
      value: '',
      options: data
    }
    for (let i = 0; i < deep; i++) {
      head = head.options?.length ? head.options[path[i]] : head
    }
    let status = head?.options?.every(item => item.isChecked === 0)
    if (status) {
      head.isChecked = 0
    } else {
      status = head?.options?.every(item => item.isChecked === 1)
      if (status) {
        head.isChecked = 1
      } else {
        head.isChecked = 2
      }
    }
  }

  const getCheckbox = (item: TreeNode) => {
    if (!item.isChecked) {
      item.isChecked = 0
    }
    const onClickParent = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation()

      let nextStatus
      if (!item.isChecked) {
        nextStatus = 1
      } else if (item.isChecked === 1) {
        nextStatus = 0
      } else {
        nextStatus = 1
      }
      onChildClick(item, nextStatus)
      let path
      path = onGetPath(data, item)
      if (path) {
        const len = path.length
        for (let i = len - 1; i >= 0; i--) {
          onSetCheckParent(data, i, path)
        }
      }
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
