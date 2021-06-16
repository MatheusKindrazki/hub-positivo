import { MenuListComponentProps, GroupTypeBase } from 'react-select'

export type OptionTreeViewProps = {
  label: string
  value: string
  options?: OptionTreeViewProps[]
}

export type MenuListProps = React.ComponentType<
  MenuListComponentProps<
    {
      label: string
      value: string
      options?: OptionTreeViewProps[]
    },
    false,
    GroupTypeBase<OptionTreeViewProps>
  >
>
