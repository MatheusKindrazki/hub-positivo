import styled from 'styled-components'

import { Box } from '..'

const Container = styled(Box)`
  .datepicker-day {
    border-left-radius: 8px;
    border-right-radius: 8px;
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
    }
  }

  .datepicker-day:hover {
    border-radius: 8px;
  }

  .datepicker-week-day {
    margin: 0;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
  }

  .datepicker-calendar {
    margin: 10px;
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
