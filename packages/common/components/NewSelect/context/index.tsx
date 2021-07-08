import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
}

const SelectContext = createContext({} as SelectContextProps)

export default SelectContext
