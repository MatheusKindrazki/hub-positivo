import styled, { css } from 'styled-components'

import { Box } from '@psdhub/common/components'

interface ContainerIconProps {
  active: boolean
}

export const ContainerIcon = styled(Box)<ContainerIconProps>`
  width: 1.5rem;
  height: 3rem;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.1s linear;

  opacity: 0;
  pointer-events: none;

  ${props =>
    props.active &&
    css`
      opacity: 1;
      pointer-events: all;
      cursor: pointer;
    `}
`