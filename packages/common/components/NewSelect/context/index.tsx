import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  refresh(): void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
  options: TreeNode[]
  isMulti?: boolean
  clearable?: boolean
  isSearchable?: boolean
  className?: string
  noOptionsMessage?: React.ReactNode
}

const SelectContext = createContext({
  isMulti: false,
  clearable: false,
  isSearchable: false,
  noOptionsMessage: 'Nada encontrado =(',
  state: {
    checked: [] as string[],
    raw: [] as TreeNode[]
  },
  refresh: () => {}
} as SelectContextProps)

export default SelectContext
