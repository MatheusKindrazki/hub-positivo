import React from 'react'

import {
  Menu,
  Box,
  BoxProps,
  MenuProps,
  MenuButtonProps
} from '@chakra-ui/react'

import MenuOptionGroup from './MenuOptionGroup'
import MenuList from './MenuList'
import MenuItemOption from './MenuItemOption'
import MenuItem from './MenuItem'
import MenuGroup from './MenuGroup'
import MenuDivider from './MenuDivider'
import MenuButton from './MenuButton'

export {
  MenuOptionGroup,
  MenuList,
  MenuItemOption,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuButton,
  Menu
}

export interface MenuHubProps extends MenuProps {
  title: string
  rightIcon?: BoxProps['as']
  menuButton?: MenuButtonProps
}

const MenuHub: React.FC<MenuHubProps> = ({
  children,
  title,
  rightIcon,
  size,
  menuButton,
  ...props
}) => {
  return (
    <Menu {...props}>
      <MenuButton
        p={3}
        py={2}
        d="inline-flex"
        type="button"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.400"
        _hover={{ bg: 'gray.400' }}
        _focus={{ boxShadow: 'outline' }}
        {...menuButton}
      >
        {title}
        {!!rightIcon && (
          <Box
            data-testid="menu-right-icon"
            d="inline"
            p="0"
            m="auto"
            ml="1"
            as={rightIcon}
            color="blue.500"
            size={size}
          />
        )}
      </MenuButton>
      {children}
    </Menu>
  )
}

export type { MenuProps }

export default MenuHub
