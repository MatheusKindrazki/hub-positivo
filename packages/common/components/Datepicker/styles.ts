import styled from 'styled-components'

import { Box } from '..'
const Container = styled(Box)`
<<<<<<< HEAD
  margin: 0.625rem;
=======
  .datepicker-calendar {
    border: 0.0625rem solid ${({ theme }) => theme.colors.gray[400]};
    border-radius: 0.5rem;
    margin: auto;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.colors.black[600]};
    font-family: 'TTNORMS';
    font-size: 1rem;
    font-weight: 700;
  }

  .react-datepicker__header {
    background: white;
    border: 0;
  }

  .react-datepicker__navigation-icon {
    ::before {
      border-color: ${({ theme }) => theme.colors.blue[500]};
      top: 0.9375rem;
    }
  }

  .react-datepicker__week {
    margin: 0.05rem;
  }
>>>>>>> 13471e28d979c64469b8ac36c2b4381676724268

  .react-datepicker__day {
    border-radius: 0;
    font-family: 'TTNORMS';
    font-weight: 400;
    line-height: 2.5rem;
    margin: 0;
    width: 2.5rem;
    &:not(.react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range):hover {
      border-radius: 0.5rem !important;
    }
  }

  .react-datepicker__day--range-end {
    border-radius: 0 0.5rem 0.5rem 0 !important;
  }

  .react-datepicker__day--range-start {
    border-radius: 0.5rem 0 0 0.5rem !important;
  }

  .react-datepicker__day--range-start.react-datepicker__day--range-end {
    border-radius: 0.5rem !important;
  }

  .react-datepicker__day--in-range {
    background: ${({ theme }) => theme.colors.blue[500]};
    color: white;
  }

  .react-datepicker__day--selecting-range-start {
    border-radius: 0.5rem 0 0 0.5rem !important;
  }

  .react-datepicker__day--selected {
    border-radius: 0.5rem;
<<<<<<< HEAD

=======
>>>>>>> 13471e28d979c64469b8ac36c2b4381676724268
    .react-datepicker__day--selecting-range-start {
      border-radius: 0.5rem 0 0 0.5rem !important;
    }
  }

  .react-datepicker__day--in-selecting-range:hover {
    border-radius: 0 0.5rem 0.5rem 0 !important;
  }

  .react-datepicker__day--outside-month {
    color: #7a7a7a;
  }

  .react-datepicker__day:hover {
    border-radius: 0;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.gray[500]};
    height: 2.5rem;
    line-height: 2.5rem;
<<<<<<< HEAD
    color: #7a7a7a;
  }

  .datepicker-calendar {
    margin: auto;
    border: 0.0625rem solid #e5e5e5;
    border-radius: 0.5rem;
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
=======
    margin: 0;
    text-align: center;
    width: 2.5rem;
>>>>>>> 13471e28d979c64469b8ac36c2b4381676724268
  }
`

export default Container
