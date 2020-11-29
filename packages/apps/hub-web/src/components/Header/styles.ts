import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .hub-logo {
    z-index: 999;
    position: relative;
    > div:not(.background-animate) {
      position: absolute;
      left: -86px!important;
      top: 57px!important;
    }
  }
`
