import styled from 'styled-components'

export const Container = styled.div`
  background: transparent;
  min-height: calc(100vh - 72px);
  width: 100%;

  .isLine {
    padding-top: 10px;

    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: -5px;
      left: 0px;
      width: 100%;
      height: 1px;
      background: #c4c4c4;
    }
  }
`
