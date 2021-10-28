import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 41px;
  height: calc(100vh - 41px);

  @media (min-width: 480px) {
    margin-top: 72px !important;
    height: calc(100vh - 72px);
  }

  width: 100%;
  display: flex;
  flex-direction: column;
`
