import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const ContainerOptions = styled(Box)`
  .hub-select-item {
    padding: ${({ theme }) => theme.space[2]};
    padding-left: ${({ theme }) => theme.space[4]};
    padding-right: ${({ theme }) => theme.space[4]};

    transition: all 0.3s ease-in-out;

    &:hover {
      background: ${({ theme }) => theme.colors.gray[300]};
    }

    &.active {
      background: ${({ theme }) => theme.colors.blue[500]};
      * {
        color: white;
      }
      border-bottom: 1px solid ${({ theme }) => theme.colors.blue[300]};

      &:last-child {
        border: none !important;
      }
    }
  }
`
