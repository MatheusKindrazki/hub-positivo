import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

const Container = styled(Box)`
  .collapse-header {
    background-color: var(--hub-base-color);
    height: 3rem;
    padding: 0.8125rem;
  }

  .tr-access-control {
    border-top: 1px solid var(--hub-colors-gray-500);
  }

  .switch-button {
    > span {
      background: var(--hub-colors-gray-400);
    }
  }
`

export default Container
