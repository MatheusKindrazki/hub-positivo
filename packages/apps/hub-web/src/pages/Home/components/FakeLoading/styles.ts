import Box from '@hub/common/components/Box'

import styled from 'styled-components'

export const Container = styled(Box)`
  cursor: pointer;

  &.isCardLoading {
    pointer-events: none;
    position: relative;
  }
`
