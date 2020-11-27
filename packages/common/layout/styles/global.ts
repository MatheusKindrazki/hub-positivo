import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --hub-base-color: #1E88E5;
    --hub-box-color: white;
    --hub-background-color: #ECEFF1;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: var(--hub-background-color);
    padding: 0;
    margin: 0;
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
