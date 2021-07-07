import styled from 'styled-components'

import Box from '@psdhub/common/components/Box'

export const Container = styled(Box)`
  position: absolute;

  z-index: 2;

  width: inherit;
  height: auto;
  max-height: 150px;
  background: white;
  margin-top: 8px;
  padding: ${({ theme }) => theme.space[2]};

  padding-left: ${({ theme }) => theme.space[4]};
  padding-right: ${({ theme }) => theme.space[4]};

  border: 1px solid;
  border-radius: ${({ theme }) => theme.radii.md};
  border-color: ${({ theme }) => theme.colors.gray[400]};

  box-shadow: ${({ theme }) => theme.shadows['dark-lg']};
`
