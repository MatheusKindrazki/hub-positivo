import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  &::before {
    content: '';
    width: 100%;
    height: 0.0625rem;
    background: ${({ theme }) => theme.colors.gray[400]};
    display: block;
    top: 0;
    position: relative;
  }
`
