export type Variants =
  | 'normal'
  | 'primary'
  | 'secondary'
  | 'checkbox'
  | 'treeview'

export interface SelectProps<T extends Variants = 'normal'> {
  /**
   * Usado para definir qual o componente será usado como Select.
   * @example
   * variant = "normal"
   */
  variant: T
  /**
   * Valores a serem selecionados.
   * @example
   * variant={[{ label: 'teste', value: 'teste' }]}
   *
   * @description
   * O valor "options" dentro do array e utilizado apenas para a variant do tipo "treeview".
   *
   */
  options: Array<Options<T>>
  isMulti?: boolean
  defaultIsOpen?: boolean
  clearable?: boolean
  isSearchable?: boolean
  closeOnSelect?: boolean
  labelLength?: number
  isBadge?: boolean
  className?: string
  placeholder?: string
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
  setValue: (values: string[]) => void
  getValue: () => { checked: string[]; raw: TreeNode[] }
}
