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
      <Box p="0" d="flex" flexDir="row" justifyContent="space-between">
        <Text fontSize="1.25rem" fontWeight="700" {...props} w="90%">
          {name}
        </Text>
        {closeButton && <DrawerCloseButton top="1.38rem" onClick={onClose} />}
      </Box>
    </>
  )
}

export default Header
