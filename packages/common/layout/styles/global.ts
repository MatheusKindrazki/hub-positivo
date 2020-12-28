import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'
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

  body {
    -webkit-font-smoothing: antialiased;
    background: var(--hub-background-color)!important;
    padding: 0;
    margin: 0;
  }


  button {
    cursor: pointer;
    box-shadow: none!important;
  }

  .Toastify__toast {
    position: relative;
    min-height: 56px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    padding: 16px 19px;
    border-radius: 8px;
    box-shadow: none!important;
    display: flex;
    justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    font-family: 'TTNorms';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    direction: ltr;
  }

  .Toastify__toast--info {
    background: var(--hub-info);
  }
  .Toastify__toast--success {
    background: var(--hub-success);
  }
  .Toastify__toast--warning {
    background: var(--hub-warning);
  }
  .Toastify__toast--error {
    background: var(--hub-error);
  }

`
