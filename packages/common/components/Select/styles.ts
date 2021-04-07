import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .hub-select.normal {
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
          fill: var(--hub-base-color);
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

  .hub-select.blue-transparent {
    * {
      box-shadow: none!important;
      color: white;
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
      border-color: white;
      background: transparent;
      border-radius: 8px;
        svg {
          fill: white;
          transition: all .2s linear;
        }

    }
    .hub__control--is-focused {
      .hub__dropdown-indicator svg {
        transform: rotate(180deg)!important;
      }
    }
  }


`
