import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .hub-logo-wrapper {
    z-index: 999;
    position: relative;
    > div:not(.background-animate) {
      top: 8px!important;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  };
`
