import styled from 'styled-components'

export const Container = styled.div`
  &.hub-solution-container {
    margin-top: 41px;
    min-height: calc(100vh - 41px);
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
    &.hub-solution-container {
      margin-top: 72px !important;
      min-height: calc(100vh - 72px);
    }

    iframe {
      height: calc(100vh - 72px);
    }
  }
`
