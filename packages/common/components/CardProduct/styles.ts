import styled from 'styled-components'

import Box from '../Box'

export const Container = styled(Box)`
  cursor: pointer;

  &.disabled {
    opacity: 0.9;
    pointer-events: none;
    position: relative;
    filter: grayscale(0.9);
    box-shadow: none;
    opacity: 0.8;
  }

  &.isHover {
    transition: box-shadow 0.4s ease-in-out;
  }
`
