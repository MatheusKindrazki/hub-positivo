import React from 'react'

import LogoOn from '@psdhub/web/src/components/LogoOn'

import { LogoContainer } from '../../styles'
import { BoxProps } from '../../../Box'
import { Box, Text } from '../../..'

interface FooterLogoProps extends BoxProps {
  columnsLength: number
}

const FooterLogo: React.FC<FooterLogoProps> = props => {
  return (
    <LogoContainer
      {...props}
      justifySelf="flex-start"
      length={props.columnsLength}
    >
      <Box as={LogoOn}></Box>
      <Text maxW="28rem" ml="12px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
        tincidunt mollis mollis. Vestibulum at quam nisi.
      </Text>
    </LogoContainer>
  )
}

export default FooterLogo
