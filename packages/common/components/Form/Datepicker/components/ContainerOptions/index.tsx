import React from 'react'

import { BoxProps } from '@psdhub/common/components/Box'

import { Container } from './styles'

const ContainerOptions: React.FC<BoxProps> = props => {
  return <Container {...props}>{props.children}</Container>
}

export default ContainerOptions
