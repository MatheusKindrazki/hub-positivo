import styled from 'styled-components'

import Box from '@psdhub/common/components/Box'

export const Container = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: ${({ theme }) => theme.space[10]};
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  transform: rotate(0);
  transition: all 0.2s linear;
`
