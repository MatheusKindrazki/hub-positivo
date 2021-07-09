import { createContext } from 'react'

import { TreeNode, StateRef } from '../types'

export interface SelectContextProps {
  onClose(): void
  onClear(): void
  onChange: (checked: string[], raw: TreeNode[]) => void

  state: StateRef
  options: TreeNode[]
  isMulti?: boolean
  clearable?: boolean
  isSearchable?: boolean
  className?: string
  defaultValue?: string[]
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
  }
} as SelectContextProps)

export default SelectContext
