import styled from 'styled-components'

export const IframeContainer = styled.div`
  iframe {
    position: relative;
    margin-top: 41px;
    width: 100%;
    height: calc(100vh - 41px);
    background: transparent;
    z-index: 1;
    position: relative;
    width: 100%;
  }

  @media (min-width: 480px) {
    iframe {
      margin-top: 72px !important;
      height: calc(100vh - 72px);
    }
  }
`
