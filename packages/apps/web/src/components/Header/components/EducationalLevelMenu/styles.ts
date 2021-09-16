import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const MenuContainer = styled(Box)`
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-x: scroll;
  .level {
    :hover {
      color: ${({ theme }) => theme.colors.blue[500]};
    }
    ::after {
      top: 10px;
      background-color: ${({ theme }) => theme.colors.blue[500]};
    }
  }

  button {
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 0px;
      background-color: ${({ theme }) => theme.colors.blue[500]};
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.2s linear;
    }
    &:hover {
      &:before {
        border-radius: 4px;
        height: 3px;
      }
    }
  }

  .active {
    color: ${({ theme }) => theme.colors.blue[500]};
    &:before {
      height: 3px;
    }
  }
`
