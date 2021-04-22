import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  .ReactCollapse--collapse {
    transition: height 300ms ease-in-out;
  }

  .collapse-header {
    background-color: var(--hub-base-color);
    height: 3rem;
    padding: 0.8125rem;
  }
  
`
