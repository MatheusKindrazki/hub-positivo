import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  .button-header {
    &:hover {

    }
  }

  .hub-menu-enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  .hub-menu-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: all 300ms ease-in;
  }
  .hub-menu-exit {
    opacity: 1;
  }
  .hub-menu-exit-active {
    opacity: 0;
    transform: translateY(0px);
    transition: all 300ms ease-in;
  }


  .hub-header-list {
    > div {
      position: absolute;
      left: auto!important;
      right: 0!important;
      top: 55px!important;
    }
  }

  .hub-items {
     * {
      ::-webkit-scrollbar {
        display: none!important;
      }
    }

    h4 {
      margin-top: 10px;

      &.margin {
        position: relative;
        padding-top: 15px;

        &:before {
          content:"";
          display: block;
          position: absolute;
          width: calc(100% + 3rem);
          left: -1.5rem;
          top: 5px;
          height: 1px;
          background-color: #C4C4C4;
        }
      }
    }
  }

`
