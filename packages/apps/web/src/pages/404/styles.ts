import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  min-height: calc(100vh - 415px);
  width: 100%;

  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin-top: 20px;

  @media (min-width: 576px) {
    margin-top: 60px;
    padding: 0;
  }
`
