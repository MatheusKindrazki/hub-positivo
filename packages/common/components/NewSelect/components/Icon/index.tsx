import React from 'react'

import { useTheme } from '@psdhub/common/hooks'
import { CaretDown } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

interface IconProps {
  open: boolean
}

const Icon: React.FC<IconProps> = ({ open }) => {
  const { colors } = useTheme()
  return (
    <Box
      as={CaretDown}
      size={18}
      color={colors.blue[500]}
      transition="all .2s ease-in-out"
      transform={open ? 'rotate(-180deg)' : 'rotate(0deg)'}
    />
  )
}

export default Icon
