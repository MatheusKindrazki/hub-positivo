import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { Box } from '../../../index'
import { BoxProps } from '../../../Box'
const FooterLogo: React.FC<BoxProps> = props => {
  return (
    <Box
      m="auto"
      px="4"
      maxW="1400px"
      {...props}
      d="flex"
      flexDir={['column', 'row']}
      alignItems={['start', 'center']}
    >
      <Box as={LogoOn} />
    </Box>
  )
}

export default FooterLogo
