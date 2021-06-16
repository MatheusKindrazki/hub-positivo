import React, { useState, useEffect } from 'react'

import { Checkbox, Stack } from '@chakra-ui/react'

export interface ITreeNode {
  name: string
  children: Array<ITreeNode>
  checkedState?: number
}

interface IProps {
  json: Array<ITreeNode>
}

const CustomTreeView: React.FC<IProps> = ({ json }: IProps): JSX.Element => {
  const [data, setData] = useState<Array<ITreeNode>>([])

  useEffect(() => {
    setData(json)
  }, [json])

  const changeNode = (
    nodeData: Array<ITreeNode>,
    item: ITreeNode,
    state: number
  ) => {
    for (let i = 0; i < nodeData.length; i++) {
      if (nodeData[i].name === item.name) {
        nodeData[i].checkedState = state
        return
      }
      if (nodeData[i].children) {
        changeNode(nodeData[i].children, item, state)
      }
    }
  }

  const onChildClick = (item: ITreeNode, state: number) => {
    changeNode(data, item, state)

    if (item.children) {
      item.children.forEach(child => {
        onChildClick(child, state)
      })
    }
  }

  const onGetPath = (data: Array<ITreeNode>, item: ITreeNode) => {
    let i
    for (i = 0; i < data.length; i++) {
      if (data[i].name === item.name) {
        return [i]
      }
      if (data[i].children) {
        const res: any = onGetPath(data[i].children, item)
        if (res) {
          return [i, ...res]
        }
      }
    }
    return null
  }

  const onSetCheckParent = (
    data: Array<ITreeNode>,
    deep: number,
    path: Array<number>
  ) => {
    let head: ITreeNode = {
      name: '',
      children: data
    }
    for (let i = 0; i < deep; i++) {
      head = head.children[path[i]]
    }
    let status = head.children.every(item => item.checkedState === 0)
    if (status) {
      head.checkedState = 0
    } else {
      status = head.children.every(item => item.checkedState === 1)
      if (status) {
        head.checkedState = 1
      } else {
        head.checkedState = 2
      }
    }
  }

  const getCheckbox = (item: ITreeNode) => {
    if (!item.checkedState) {
      item.checkedState = 0
    }
    const onClickParent = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation()

      console.log(event, item)

      let nextStatus
      if (!item.checkedState) {
        nextStatus = 1
      } else if (item.checkedState === 1) {
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
    }

    return (
      <Checkbox
        isChecked={item.checkedState === 1}
        isIndeterminate={![0, 1].includes(item.checkedState)}
        onChange={e => onClickParent(e)}
      >
        {item.name}
      </Checkbox>
    )
  }

  const getTreeWidget = (children: Array<ITreeNode>) => {
    return children.map((parent: ITreeNode) => (
      <>
        {getCheckbox(parent)}
        {parent.children && (
          <Stack pl={6} mt={1} spacing={1}>
            {getTreeWidget(parent.children)}
          </Stack>
        )}
      </>
    ))
  }

  return <>{getTreeWidget(data)}</>
}

export default CustomTreeView
