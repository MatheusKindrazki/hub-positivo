import React from 'react'

import {
  Menu as MenuChakra,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuProps,
  MenuGroup,
  MenuItemOption,
  MenuOptionGroup
} from '@chakra-ui/react'

const MenuContainer: React.FC<MenuProps> = ({ children, ...rest }) => {
  return <MenuChakra {...rest}>{children}</MenuChakra>
}

export default {
  MenuContainer,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuGroup,
  MenuItemOption,
  MenuOptionGroup
}
