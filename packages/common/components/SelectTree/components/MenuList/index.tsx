import React from 'react'

import { MenuListComponentProps, GroupTypeBase } from 'react-select'

import { Box } from '@psdhub/common/components'

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

const MenuList: MenuListProps = props => {
  console.log(props.options)

  return (
    <Box>
      <Box>{props.children}</Box>
    </Box>
  )
}

export default MenuList
