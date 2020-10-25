import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  body {
    -webkit-font-smoothing: antialiased;
    overflow: initial!important;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast{
    border-radius: 4px!important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)!important;
  }
`;
