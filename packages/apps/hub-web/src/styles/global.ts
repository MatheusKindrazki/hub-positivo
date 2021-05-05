import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --hub-base-color: #1E88E5;
    --hub-box-color: white;
    --hub-background-color: #ECEFF1;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: var(--hub-background-color)!important;
  }

  button {
    cursor: pointer;
    box-shadow: none!important;
  }

  body {
    outline: none!important;
  }

`
