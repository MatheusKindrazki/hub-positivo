import styled from 'styled-components'

import Button from '@psdhub/common/components/Button'

export const Container = styled(Button)`
  &.active {
    background: ${({ theme }) => theme.colors.blue[500]};
    color: white;
    opacity: 1 !important;
  }
`
