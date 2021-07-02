import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

interface ContainerProps {
  reject: boolean
  url: string
  colors: any
  error: boolean
}

interface PreviewContainerProps {
  colors: any
}

export const Container = styled(Box)<ContainerProps>`
  display: flex;
  padding: 1rem;
  border: ${props =>
    props?.reject || props?.error
      ? `2px solid ${props.colors.red[300]};`
      : props.url
      ? `2px solid ${props.colors.gray[100]};`
      : `2px dashed ${props.colors.gray[100]};`};
  border-radius: 8px;
  box-sizing: border-box;
  transition: all 0.2s linear;
  background-color: ${props => (props.url ? 'white' : props.colors.gray[200])};

  &:not(.preview) {
    cursor: pointer;

    &:hover {
      border: ${props => `2px dashed ${props.colors.blue[300]};`};
    }
  }
`

export const PreviewContainer = styled(Box)<PreviewContainerProps>`
  box-sizing: content-box;
  width: 7rem;
  height: 7rem;
  background-color: ${props => props.colors.blue[500]};
  border-radius: 8px;
  display: flex;
  justify-content: center;
`
