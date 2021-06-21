import React from 'react'

import { X } from '@psdhub/common/components/Icons'
import { BoxProps } from '@psdhub/common/components/Box'
import { Box, Text } from '@psdhub/common/components'
interface TagProps extends BoxProps {
  onClose?: () => void
}

const Tag: React.FC<TagProps> = ({ children, onClose, ...props }) => {
  return (
    <Box
      px="4"
      py="2"
      m="1"
      borderRadius="20px"
      bg="blue.50"
      d="inline-flex"
      fontSize="0.9375rem"
      flexWrap="nowrap"
      className="hub-tag"
      {...props}
    >
      <Text>{children}</Text>

      {!!onClose && (
        <Box
          onClick={onClose}
          cursor="pointer"
          p="0"
          m="auto"
          as={X}
          size={16}
          mr="-5px!important"
          ml="5px!important"
          color="inherit"
        />
      )}
    </Box>
  )
}

export default Tag
