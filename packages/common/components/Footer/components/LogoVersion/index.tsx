import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { BoxProps } from '../../../Box'
import { Box, Text } from '../../..'

const LogoVersion: React.FC<BoxProps> = props => {
  return (
    <Box
      {...props}
      d="flex"
      m="1"
      flexDir={['column', 'row', 'row', 'column']}
      alignItems={['start', 'center', 'center', 'start']}
    >
      <Box as={LogoOn} />
      <Text as="span" w="90%" p="1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        tincidunt mollis mollis. Vestibulum at quam nisi.s
      </Text>
    </Box>
  )
}

export default LogoVersion
