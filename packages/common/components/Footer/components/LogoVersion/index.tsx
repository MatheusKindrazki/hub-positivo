import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { BoxProps } from '../../../Box'
import { Box, Text } from '../../..'

const LogoVersion: React.FC<BoxProps> = props => {
  return (
    <Box {...props} justifySelf="flex-start">
      <Box as={LogoOn}></Box>
      <Text>{`V.${process.env.REACT_APP_VERSION as string}`}</Text>
    </Box>
  )
}

export default LogoVersion
