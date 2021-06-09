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
        O Hub é a Home Page do Positivo On. Esta página serve, de maneira
        unificada, todas as soluções didáticas oferecidas para você em uma única
        página.
      </Text>
    </Box>
  )
}

export default FooterLogo
