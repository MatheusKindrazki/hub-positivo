import Box from '@hub/common/components/Box'

import styled from 'styled-components'

export const Container = styled(Box)`
  form {
    transition: all 0.3s linear;
  }
  .disabled {
    pointer-events: none;
    opacity: 0.6;
    filter: grayscale(4);
  }
`
