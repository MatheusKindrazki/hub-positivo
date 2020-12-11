import { Box } from '@hub/common/components'

import styled from 'styled-components'

export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .goback-button {
    position: absolute;

    transition: all 0.3s ease-in-out;
    transition-delay: 0.2s 0s;
    opacity: 0;
  }

  .hub-svg-logo {
    transition: all 0.3s ease-in-out;
    transform: translateX(0);
  }

  &:hover {
    .goback-button {
      opacity: 1;
    }
    .hub-svg-logo {
      transform: translateX(25px);
    }
  }
`
