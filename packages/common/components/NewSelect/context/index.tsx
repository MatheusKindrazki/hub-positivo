import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  refresh(): void
  searchable: (value: string) => void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
  options: TreeNode[]
  isMulti?: boolean
  isBadge?: boolean
  clearable?: boolean
  isSearchable?: boolean
  labelLength?: number
  className?: string
  allSelectMessage?: string
  noOptionsMessage?: React.FC
}

const SelectContext = createContext({
  isMulti: false,
  clearable: false,
  isBadge: false,
  isSearchable: false,
  state: {
    checked: [] as string[],
    raw: [] as TreeNode[]
  },
  refresh: () => {},
  searchable: _ => {}
} as SelectContextProps)

export default SelectContext
