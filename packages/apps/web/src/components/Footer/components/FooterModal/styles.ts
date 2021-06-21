import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  max-height: 20rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(60, 60, 60, 0.3);
    border-radius: 8px;
  }
`
