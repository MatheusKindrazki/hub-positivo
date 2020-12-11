import styled from 'styled-components'

export const IframeContainer = styled.div`
  position: relative;
  margin-top: 72px;
  width: 100%;
  height: calc(100vh - 72px);

  iframe {
    position: relative;
    margin-top: 72px;
    width: 100%;
    height: calc(100vh - 72px);
    background: transparent;
    z-index: 1;
  }
`
