import styled from 'styled-components'

import { Box } from '..'
const Container = styled(Box)`
  /* REGRAS PARA FUNCIONAMENTO DE BORDER-RADIUS DINÂMICOS */
  .react-datepicker__day {
    border-radius: 0;
    &:not(.react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range) {
      border-radius: 0.5rem 0 0 0.5rem !important;
    }
    font-family: 'TTNORMS';
    font-weight: 400;
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0;
  }

  .react-datepicker__day--selecting-range-start,
  .react-datepicker__day--range-start {
    border-radius: 0.5rem 0 0 0.5rem !important;
  }

  .react-datepicker__day--range-end {
    border-radius: 0 0.5rem 0.5rem 0 !important;
  }

  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    border-radius: 0.5rem !important;
  }

  /* ESTILIZAÇÃO COMUM */

  .react-datepicker__day--in-range {
    color: white;
    background: ${({ theme }) => theme.colors.blue[500]};
  }

  .react-datepicker__week {
    margin: 0.05rem;
  }
  .react-datepicker__navigation {
    width: 4.0625rem;
    height: 3rem;
  }

  .react-datepicker__navigation-icon {
    ::before {
      top: 0.9rem;
      border-color: ${({ theme }) => theme.colors.blue[500]};
      border-radius: 2px;
      border-width: 2px 2px 0 0;
    }
  }

  .react-datepicker__day:hover {
    border-radius: 0;
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .react-datepicker__day-name {
    margin: 0;
    width: 2.5rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .datepicker-calendar {
    border: 0.0625rem solid ${({ theme }) => theme.colors.gray[500]};
    padding: 1px;
    border-radius: 0.5rem;
  }

  .react-datepicker__header {
    border: 0;
    background: white;
    border-radius: 0;
  }

  .react-datepicker__current-month {
    font-family: 'TTNORMS';
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray[600]};
    font-size: 1rem;
    text-transform: capitalize;
    margin-bottom: 1rem;
  }

  .react-datepicker__day--today {
    &:not(.react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range) {
      background: white;
      color: ${({ theme }) => theme.colors.blue[500]};
      height: 2.5rem;
      &:after {
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 50%;
        content: '';
        justify-content: center;
        display: block;
        left: 45%;
        bottom: 0.625rem;
        position: relative;
        background: ${({ theme }) => theme.colors.blue[500]};
      }
    }
  }

  .react-datepicker__month-container {
    padding: 0.5rem;
  }
`

export default Container
