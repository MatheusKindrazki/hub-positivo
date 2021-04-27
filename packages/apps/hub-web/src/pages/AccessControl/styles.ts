import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

const Container = styled(Box)`
  .collapse-header {
    background-color: var(--hub-base-color);
    height: 3rem;
    padding: 0.8125rem;
  }

  .switch-button {
    > span {
      background: var(--hub-base-color);

      &[data-checked] {
        background: var(--hub-colors-gray-400);
      }
    }
  }
`

export default Container
