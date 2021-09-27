import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(60, 60, 60, 0.3);
    border-radius: 1rem;
  }

  .container {
    &:last-child {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
`
