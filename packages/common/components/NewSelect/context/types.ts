import { TreeNode, StateRef } from '../types'

interface SelectContextProps {
  onClose(): void
  refresh(): void
  onInputFocus(): void
  onInputBlur(): void
  searchable: (value: string) => void
  onChange: (checked: string[], raw: TreeNode[]) => void
  getState(): StateRef
  setState(data: StateRef): void
  options: TreeNode[]
  isMulti?: boolean
  isBadge?: boolean
  clearable?: boolean
  isSearchable?: boolean
  labelLength?: number
  className?: string
  allSelectMessage?: string
  placeholderPersist?: boolean
  noOptionsMessage?: React.FC
}

interface SelectProviderProps {
  onChange?: (checked: string[], raw: TreeNode[]) => void
  onClose: () => void
  closeOnSelect?: boolean
}

export type { SelectContextProps, SelectProviderProps, TreeNode }
