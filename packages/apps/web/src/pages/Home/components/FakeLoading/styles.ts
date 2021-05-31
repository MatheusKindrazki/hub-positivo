import styled from 'styled-components'

import Box from '@psdhub/common/components/Box'

export const Container = styled(Box)`
  cursor: pointer;

  &.isCardLoading {
    pointer-events: none;
    position: relative;
  }
`
