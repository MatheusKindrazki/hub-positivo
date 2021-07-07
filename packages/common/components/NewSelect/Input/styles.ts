import styled from 'styled-components'

export const Input = styled.input`
  /* position: absolute; */
  outline: none;
  width: 100%;
  left: 0;
  margin: auto 0;
  border: none;
  box-shadow: none;
  height: inherit;
  z-index: 0;

  pointer-events: none;

  &::placeholder {
    color: inherit;
  }
`
