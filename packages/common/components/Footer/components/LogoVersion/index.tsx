import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { Box, Text } from '../../../index'
import { BoxProps } from '../../../Box'
const FooterLogo: React.FC<BoxProps> = props => {
  return (
    <Box
      p="1"
      {...props}
      d="flex"
      flexDir={['column', 'row', 'row', 'row', 'column']}
      alignItems={['start', 'center', 'center', 'center', 'start']}
    >
      <Box as={LogoOn} />
      <Text
        as="span"
        w="90%"
        textAlign="justify"
        pl={[0, 3, 3, 3, 0]}
        fontSize="1rem"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        tincidunt mollis mollis. Vestibulum at quam nisi.
      </Text>
    </Box>
  )
}

export default FooterLogo
