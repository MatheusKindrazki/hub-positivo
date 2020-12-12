import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  .hub-card-header-disabled {
    pointer-events: none;
    box-shadow: none;
    filter: grayscale(0.9);
    opacity: 0.5;
  }
`
