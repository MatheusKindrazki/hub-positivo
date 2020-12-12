import styled from 'styled-components'

import Box from '../Box'

export const Container = styled(Box)`
  cursor: pointer;

  &.disabled {
    pointer-events: none;
    position: relative;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.6) !important;

    *:not(span) {
      filter: grayscale(0.9);
      opacity: 0.5;
    }

    b,
    p {
      opacity: 1 !important;
    }

    > span {
      z-index: 1;
    }
  }

  &.isHover {
    transition: 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  }
`
