import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

interface ContainerProps {
  length: number
}

export const FooterContainer = styled(Box)<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.length > 4 ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
`

export const LogoContainer = styled(Box)<ContainerProps>`
  display: flex;
  flex-direction: ${props => (props.length > 4 ? 'row' : 'column')};
  width: ${props => (props.length > 4 ? '100%' : '20%')};
  padding: '12, 0';
  margin-bottom: '12px';
`

export const ColumnsContainer = styled(Box)<ContainerProps>`
  display: flex;
  width: ${props => (props.length > 4 ? '100%' : '80%')};
  flex-wrap: ${props => (props.length > 4 ? 'wrap' : 'nowrap')};
`
