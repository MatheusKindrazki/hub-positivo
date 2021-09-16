import React from 'react'

import Text, { TextProps } from '@psdhub/common/components/Text'
import {
  DrawerCloseButton
  // DrawerHeader
} from '@psdhub/common/components/Drawer'
import { Box } from '@psdhub/common/components'

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
      <Box p="0" maxW="90%">
        <Text fontSize="1.25rem" fontWeight="700" {...props}>
          {name}
        </Text>
      </Box>
    </>
  )
}

export default Header
