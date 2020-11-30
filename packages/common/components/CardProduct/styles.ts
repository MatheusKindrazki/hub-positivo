import styled from 'styled-components'

import Box from '../Box'

export const Container = styled(Box)`
  &.disabled {
    opacity: 0.9;
    pointer-events: none;
  }
`
