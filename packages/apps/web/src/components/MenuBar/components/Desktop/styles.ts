import styled from 'styled-components'

import { DrawerContent } from '@psdhub/common/components/Drawer'
export const DrawerContentContainer = styled(DrawerContent)`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 10px;
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
