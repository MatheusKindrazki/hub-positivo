import styled from 'styled-components'

import { DrawerBody } from '@psdhub/common/components/Drawer'
export const DrawerBodyContainer = styled(DrawerBody)`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(60, 60, 60, 0.3);
    border-radius: 1rem;
  }

  .collapse {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`
