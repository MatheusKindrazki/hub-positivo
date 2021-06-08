import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { BoxProps } from '../../../Box'
import { Box, Text } from '../../..'

const FooterLogo: React.FC<BoxProps> = props => {
  return (
    <Box {...props} justifySelf="flex-start" w="20%">
      <Box as={LogoOn}></Box>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        tincidunt mollis mollis. Vestibulum at quam nisi.
      </Text>
    </Box>
  )
}

export default FooterLogo
