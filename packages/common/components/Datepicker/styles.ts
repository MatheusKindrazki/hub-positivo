import styled from 'styled-components'

import { Box } from '..'

const Container = styled(Box)`
  margin: 10px;

  .react-datepicker__day {
    border-radius: 0;
    font-family: 'TTNORMS';
    font-weight: 400;
    color: #3c3c3c;
    width: 2.5rem;
    line-height: 2.5rem;
    margin: 0;
  }

  .react-datepicker__day:hover {
    border-radius: 0;
  }

  .react-datepicker__navigation-icon {
    ::before {
      border-color: ${({ theme }) => theme.colors.blue[500]};
      top: 0.9375rem;
    }
  }

  .react-datepicker__day-name {
    color: #7a7a7a;
    margin: 0;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
  }

  .datepicker-calendar {
    margin: auto;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
  }

  .react-datepicker__week {
    .react-datepicker__day--in-range {
      background: ${({ theme }) => theme.colors.blue[500]};
      color: white;
    }

    div &:first {
      background: red !important;
    }
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
