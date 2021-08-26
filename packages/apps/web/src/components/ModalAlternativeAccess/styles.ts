import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  .modal-acesso-alternativo {
    .chakra-modal__close-btn,
    .hub-modal__close-btn {
      display: none;
    }

    header {
      font-size: 16px;

      @media(min-width: 768px) {
        font-size: 24px;

      }
    }

    button {
      max-width: 100px;
      align-self: flex-end;
    }
  }
`
