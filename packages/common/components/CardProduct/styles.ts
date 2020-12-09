import styled from 'styled-components'

import Box from '../Box'

export const Container = styled(Box)`
  cursor: pointer;

  &.disabled {
    pointer-events: none;
    position: relative;
    filter: grayscale(0.9);
    box-shadow: none;
    opacity: 0.4;
  }

  &.isHover {
    transition: 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  }
`
