import React from 'react'

import { Menu, MenuButton } from '@psdhub/common/components/Menu'
import { BoxProps } from '@psdhub/common/components/Box'
import { Button } from '@psdhub/common/components'

interface HeaderButtonProps extends BoxProps {
  onClick: () => void
  isMenu?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  onClick,
  as,
  isMenu = false,
  isOpen = false,
  onClose
}) => {
  return (
    <Menu isOpen={isOpen} placement="bottom-start" onClose={onClose}>
      <Button
        cursor="pointer"
        h="7"
        variant="ghost"
        p="0"
        m="0"
        mr="2"
        color="blue.500"
        alignSelf="center"
        data-testid="header-button"
        onClick={onClick}
        as={as}
      >
        {isMenu ? <MenuButton as={as} /> : children}
      </Button>
      {isMenu && children}
    </Menu>
  )
}

export default HeaderButton
