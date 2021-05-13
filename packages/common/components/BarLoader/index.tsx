import React from 'react'

import Loading from 'react-spinners/BarLoader'

import { Box, BoxProps } from '@chakra-ui/react'

import { useTheme } from '../../layout'

export interface BarProps extends Omit<BoxProps, 'width' | 'color'> {
  loading: boolean
  height: string
  color?: string
}
const BarLoader: React.FC<BarProps> = ({ loading, height, color, ...rest }) => {
  const { colors } = useTheme()

  return (
    <Box as="span" pos="fixed" top="0" left="0" width="100%" d="flex" {...rest}>
      <Loading
        loading={loading}
        color={color || colors.blue[500]}
        width="100%"
        height={height || '4px'}
      />
    </Box>
  )
}

export default BarLoader
