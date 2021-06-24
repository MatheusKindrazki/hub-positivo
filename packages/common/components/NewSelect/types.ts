import {
  ThemingPropsThunk,
  SystemStyleObjectRecord,
  BoxProps
} from '@chakra-ui/react'

import { TreeNode } from '../Tree'

export type ComponentStyle = ThemingPropsThunk<SystemStyleObjectRecord>

export type VariantType =
  | 'normal'
  | 'primary'
  | 'secondary'
  | 'checkbox'
  | 'treeview'

export type Option = Omit<TreeNode, 'isChecked'>

export interface NewSelectProps extends BoxProps {
  isMulti?: boolean
  defaultIsOpen?: boolean
  controlStyle?: ComponentStyle
  notFoundText?: React.ReactNode
  defaultValue?: string[]
  options?: Option[]
  variant: VariantType
}

export interface HandleSelectRef {
  setSelection(value: string[]): string[]
}
