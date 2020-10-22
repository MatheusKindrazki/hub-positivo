import { createGlobalStyle } from 'styled-components';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    outline: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
    overflow: initial!important;
  }

  body, input{
    font-size: 14px!important;
    font-family: 'Nunito', sans-serif;
  }

  button {
    font-size: 18px!important;
    font-family: 'Nunito', sans-serif;
    outline: none !important;
  }

  button {
    cursor: pointer;
  }
`;
