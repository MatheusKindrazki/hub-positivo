import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  :root {
    --hub-base-color: #1E88E5;
    --hub-box-color: white;
    --hub-background-color: #ECEFF1;

    --hub-success: #0097A7;
    --hub-warning: #F2C44C;
    --hub-error: #D81B60;
    --hub-info: #263238;
  }


  .background-animate, button {
    transition: background-color 1s, color 1s, fill 1s, ease 0.5s!important;
  }


  body {
    outline: none!important;
  }



`
