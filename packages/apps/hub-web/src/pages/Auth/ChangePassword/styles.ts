import styled from 'styled-components'

import Box from '@psdhub/common/components/Box'

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
