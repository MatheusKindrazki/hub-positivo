import styled, { css } from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  .datepicker-calendar {
    border: none !important;
  }

  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus,
  &.active {
    .hub-date-picker-header {
      border-color: ${({ theme }) => theme.colors.blue[500]};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.blue[500]};
    }
  }

  .hub-date-picker-header {
    position: relative;
    background: white;
    outline: none;
    width: 100%;
    border: 1px solid;
    overflow: hidden;

    border-radius: ${({ theme }) => theme.radii.md};
    border-color: ${({ theme }) => theme.colors.gray[400]};

    transition: all 0.2s ease-in-out;

    ${({ error }) =>
      error &&
      css`
        border-color: ${({ theme }) => theme.colors.red[300]};
      `}

    &:hover {
      border-color: ${({ theme }) => theme.colors.blue[500]};
    }

    padding-inline-start: ${({ theme }) => theme.space[4]};
    padding-inline-end: ${({ theme }) => theme.space[8]};

    height: 3rem;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .hub-date-picker-header-title {
      width: 100%;
    }
  }
`
