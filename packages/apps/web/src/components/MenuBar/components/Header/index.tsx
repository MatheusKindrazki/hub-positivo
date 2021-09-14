import React from 'react'

import Text, { TextProps } from '@psdhub/common/components/Text'
import {
  DrawerCloseButton,
  DrawerHeader
} from '@psdhub/common/components/Drawer'

export interface HeaderProps extends TextProps {
  name: string
  closeButton: boolean
  onClose: () => void
}

const Header: React.FC<HeaderProps> = ({
  name,
  closeButton,
  onClose,
  ...props
}) => {
  return (
    <>
      {closeButton && <DrawerCloseButton top="4" onClick={onClose} />}
      <DrawerHeader>
        <Text {...props}>{`Olá, ${name}!`}</Text>
      </DrawerHeader>
    </>
  )
}

export default Header
