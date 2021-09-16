import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const NavContainer = styled(Box)`
  padding-top: 15px;
  padding-bottom: 15px;

  max-width: 100%;
  overflow: scroll;

  @media (min-width: 880px) {
    padding-top: 0;
    padding-bottom: 0;
    overflow: initial;
  }

  .nav-container {
    position: relative;
    .divider {
      position: absolute;
      left: 0;
      bottom: -1.5rem;
      width: 100%;
      height: 0px;
      background: white;
      display: none;

      border-radius: 4px;

      transition: all 0.2s ease-in-out;

      @media (min-width: 880px) {
        display: block;
      }
    }
  }
`
