import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  margin-top: 41px;
  min-height: calc(100vh - 41px);

  .hub-login-container {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  iframe {
    position: relative;
    width: 100%;
    background: transparent;
    z-index: 1;
    position: relative;
    width: 100%;
    height: calc(100vh - 41px);
  }

  @media (min-width: 480px) {
    margin-top: 72px !important;
    min-height: calc(100vh - 72px);

    iframe {
      height: calc(100vh - 72px);
    }
  }
`
