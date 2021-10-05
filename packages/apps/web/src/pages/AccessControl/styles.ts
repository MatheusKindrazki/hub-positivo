import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  .collapse-header {
    background-color: ${({ theme }) => theme.colors.blue[500]};
    height: 3rem;
    padding: 0.8125rem;
  }
`
