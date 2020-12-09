import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .hub-logo {
    z-index: 999;
    position: relative;
    > div:not(.background-animate) {
      top: 8px!important;
    }
  }
`
