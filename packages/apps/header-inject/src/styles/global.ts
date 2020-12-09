import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  body {
    margin-top: 72px!important;
  }

  #hub-inject {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 72px;
    z-index: 99999999999!important;
  }
`
