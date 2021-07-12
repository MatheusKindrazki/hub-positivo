export type Variants =
  | 'normal'
  | 'primary'
  | 'secondary'
  | 'checkbox'
  | 'treeview'

export interface SelectProps<T extends Variants = 'normal'> {
  variant: T
  options: Array<Options<T>>
  isMulti?: boolean
  defaultIsOpen?: boolean
  clearable?: boolean
  isSearchable?: boolean
  className?: string
  defaultValue?: string[]
  noOptionsMessage?: React.ReactNode
  onChange?: (checked: string[], raw: TreeNode[]) => void
}

type Options<T> = T extends 'treeview' ? TreeNode : Omit<TreeNode, 'isChecked'>

export interface TreeNode {
  label: string
  value: string
  options?: Array<TreeNode>
  isChecked?: number
}

export interface StateRef {
  checked: string[]
  raw: TreeNode[]
}
export interface SelectRefProps {
  value: TreeNode[]
  setValue?: (values: string[]) => void
  getValue?: () => { checked: string[]; raw: TreeNode[] }
}
