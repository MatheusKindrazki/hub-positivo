import React from 'react'

import Text, { TextProps } from '@psdhub/common/components/Text'
import { DrawerCloseButton } from '@psdhub/common/components/Drawer'
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
      <Box p="0" d="flex" flexDir="row">
        <Text fontSize="1.25rem" fontWeight="700" {...props}>
          {name}
        </Text>
        {closeButton && (
          <DrawerCloseButton right="1" position="relative" onClick={onClose} />
        )}
      </Box>
    </>
  )
}

export default Header
