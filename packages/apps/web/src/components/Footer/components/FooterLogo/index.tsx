import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'
import { BoxProps } from '@psdhub/common/components/Box'
import { Box } from '@psdhub/common/components'

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
