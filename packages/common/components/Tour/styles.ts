import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  #___reactour{

    .reactour__close {
      top: 15px!important;
      right: 15px!important;
      outline: none!important;
    }

    .hub-tour {
      font-family: 'TTNorms'!important;
      font-size: bold!important;
      border-radius: 5px!important;

      >div {
        justify-content: center;
      }

      .reactour__dot{
        outline: none!important;


        &:before {
          content: none
        }
      }

      &:focus {
        outline: none!important
      }

      >span {
        display: none;
      }
    }
  }
`
