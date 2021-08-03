export type Variants = 'normal' | 'radio' | 'checkbox' | 'treeview'

export interface SelectProps {
  /**
   * Usado para definir qual o componente será usado como Select.
   * @example
   * variant = "normal"
   */
  variant: Variants
  /**
   * Valores a serem selecionados.
   * @example
   * variant={[{ label: 'teste', value: 'teste' }]}
   *
   * @description
   * O valor "options" dentro do array e utilizado apenas para a variant do tipo "treeview".
   * "isChecked " não é obrigatório, mas é utilizado para definir o estado da opção.
   *
   */
  options: Array<TreeNode>
  isMulti?: boolean
  hideSelected?: boolean
  defaultIsOpen?: boolean
  clearable?: boolean
  isSearchable?: boolean
  closeOnSelect?: boolean
  labelLength?: number
  isBadge?: boolean
  className?: string
  placeholder?: string
  defaultValue?: string[]
  noOptionsMessage?: React.FC
  allSelectMessage?: string
  error?: boolean
  onChange?: (checked: string[], raw: TreeNode[]) => void
}
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
  clearAll(): void
  setValue: (values: string[]) => void
  getValue: () => { checked: string[]; raw: TreeNode[] }
}
