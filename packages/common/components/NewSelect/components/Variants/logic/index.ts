import { useState, FC, useMemo } from 'react'

import { getObjectValues } from '@psdhub/common/components/Tree/utils'
import {
  handleParents,
  filterRecursive
} from '@psdhub/common/components/NewSelect/utils'
import { StateRef, TreeNode } from '@psdhub/common/components/NewSelect/types'
import { SelectContextProps } from '@psdhub/common/components/NewSelect/context'

interface ReturnData {
  handleClick(item: TreeNode | TreeNode[], disableIsMulti?: boolean): void
  checkSelectedItem(item: TreeNode): TreeNode | undefined
  noOptionsMessage: FC | undefined
  renderedOptions: TreeNode[]
  defaultChecked: StateRef
  allSelectMessage?: string
}

const useCheckedLogic = (context: SelectContextProps): ReturnData => {
  const { options, state, isMulti, noOptionsMessage, allSelectMessage } =
    context

  const [renderedOptions, setRenderedOptions] = useState(options)

  const handleClick = (item: TreeNode, disableIsMulti?: boolean) => {
    let items = [] as TreeNode[]

    if (Array.isArray(item)) {
      items = item?.map(e => ({
        ...e,
        isChecked: 1
      }))
    } else {
      const prepareItem = { ...item, isChecked: 1 }

      const enableIsMulti = !disableIsMulti && isMulti

      items = handleParents(state.raw, prepareItem, enableIsMulti)
    }

    context.onChange(getObjectValues(items), items)

    context.refresh()
  }

  const checkSelectedItem = (item: TreeNode) => {
    const isChecked = state.raw.find(i => {
      if (i.value === item.value) {
        return i.isChecked
      }

      return false
    })

    return isChecked
  }

  context.searchable = (e: string) => {
    if (!e) return setRenderedOptions(options)

    const filteredOptions = filterRecursive<TreeNode>(options, e)
    setRenderedOptions(filteredOptions)
  }

  const defaultChecked = useMemo(() => {
    return state
  }, [state])

  return {
    handleClick,
    checkSelectedItem,
    noOptionsMessage,
    allSelectMessage,
    defaultChecked,
    renderedOptions
  }
}

export { useCheckedLogic }
