import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  position: relative;
  background: transparent;
  outline: none;
  border: none;
  width: 100%;

  max-width: 100%;

  font-size: ${({ theme }) => theme.fontSizes.sm};

  .hub-header {
    position: relative;
    background: white;
    outline: none;
    width: 100%;
    border: 1px solid;
    overflow: hidden;

    border-radius: ${({ theme }) => theme.radii.md};
    border-color: ${({ theme }) => theme.colors.gray[400]};

    padding-inline-start: ${({ theme }) => theme.space[4]};
    padding-inline-end: ${({ theme }) => theme.space[10]};

    height: 3rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .hub-header-title {
      width: 100%;
    }
  }
`
