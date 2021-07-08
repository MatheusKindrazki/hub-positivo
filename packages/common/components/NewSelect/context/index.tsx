import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
  options: TreeNode[]
  isMulti?: boolean
}

const SelectContext = createContext({
  isMulti: false,
  state: {
    checked: [] as string[],
    raw: [] as TreeNode[]
  }
} as SelectContextProps)

export default SelectContext
