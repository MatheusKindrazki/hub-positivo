import styled from 'styled-components'

import { Box } from '..'

const Container = styled(Box)`
  margin: 10px;

  .react-datepicker__day--range-end {
    border-radius: 0 8px 8px 0 !important;
  }

  .react-datepicker__day--range-start {
    border-radius: 8px 0 0 8px !important;
    transition: border-radius 0.1s ease-in-out;
  }

  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    border-radius: 8px !important;
  }

  .react-datepicker__week {
    margin: 0.05rem;
  }

  .react-datepicker__day {
    border-radius: 0;
    font-family: 'TTNORMS';
    font-weight: 400;
    color: #3c3c3c;
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0;
  }

  .react-datepicker__navigation-icon {
    ::before {
      border-color: ${({ theme }) => theme.colors.blue[500]};
      top: 0.9375rem;
    }
  }

  .react-datepicker__day--outside-month {
    color: #7a7a7a;
  }

  .react-datepicker__day:hover {
    border-radius: 0;
  }

  .react-datepicker__day-name {
    margin: 0;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    color: #7a7a7a;
  }

  .datepicker-calendar {
    margin: auto;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
  }

  .react-datepicker__day--in-range {
    color: white;
    background: ${({ theme }) => theme.colors.blue[500]};
  }

  .react-datepicker__header {
    border: 0;
    background: white;
  }

  .react-datepicker__current-month {
    font-family: 'TTNORMS';
    font-weight: 700;
    color: #3c3c3c;
    font-size: 1rem;
  }
`

export default Container
