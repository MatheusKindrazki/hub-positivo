import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --hub-base-color: #1E88E5;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  .background-animate, button {
    transition: background-color 1s, color 1s, ease 0.5s!important;
  }

  button {
    cursor: pointer;
    box-shadow: none!important;
  }

  .Toastify__toast{
    border-radius: 4px!important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)!important;
  }

`
