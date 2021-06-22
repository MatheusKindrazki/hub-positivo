import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: solid 1.5px #c4c4c4;
  padding: 1rem;
  background-color: white;
  width: 100%;
  flex-wrap: nowrap;

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:nth-last-child(1) {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: none;
  }
`

export const DeleteButton = styled(Box)`
  color: #7a7a7a;
  align-self: center;
  justif-yself: flex-end;
  &:hover {
    cursor: pointer;
    color: #3c3c3c;
  }
`
