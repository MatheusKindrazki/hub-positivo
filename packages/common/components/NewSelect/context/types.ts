import { TreeNode, StateRef } from '../types'

interface SelectContextProps {
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

interface SelectProviderProps {
  onChange?: (checked: string[], raw: TreeNode[]) => void
  onClose: () => void
  closeOnSelect?: boolean
}

export type { SelectContextProps, SelectProviderProps, TreeNode }
