import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  body {
    -webkit-font-smoothing: antialiased;
    overflow: initial!important;
  }

  button {
    cursor: pointer;
    box-shadow: none!important;
  }

  .Toastify__toast{
    border-radius: 4px!important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)!important;
  }
  .hub-select {
    * {
      box-shadow: none!important;
    }


    .hub__indicator-separator {
      opacity: 0;
    }

    &.height-md {
      .hub__control {
        min-height: 40px!important;

        * {
          font-size: 0.8125rem!important;
        }

      }
    }

    .hub__control  {
      min-height: 48px;
      border-color: #D9D9D9;
      background: #ECEFF1;
      border-radius: 8px;
        svg {
          fill: ${({ theme }) => theme.colors.blue[500]};
          transition: all .2s linear;
        }

    }
    .hub__control--is-focused {
      .hub__dropdown-indicator svg {
        transform: rotate(180deg)!important;
      }
    }
  }

  .hub__menu {
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1)!important;
  }

`;
