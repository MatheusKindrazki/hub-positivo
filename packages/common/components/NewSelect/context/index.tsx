import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  refresh(): void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
  options: TreeNode[]
  isMulti?: boolean
  isBadge?: boolean
  clearable?: boolean
  isSearchable?: boolean
  labelLength?: number
  className?: string
  noOptionsMessage?: React.ReactNode
}

const SelectContext = createContext({
  isMulti: false,
  clearable: false,
  isBadge: false,
  isSearchable: false,
  noOptionsMessage: 'Nada encontrado =(',
  state: {
    checked: [] as string[],
    raw: [] as TreeNode[]
  },
  refresh: () => {}
} as SelectContextProps)

export default SelectContext