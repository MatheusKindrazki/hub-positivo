import styled from 'styled-components'

export const Input = styled.input`
  /* position: absolute; */
  outline: none;

  background: transparent;
  left: 0;
  margin: auto 0;
  border: none;
  box-shadow: none;
  height: inherit;
  z-index: 0;

  pointer-events: none;

  z-index: 9999;

  &::placeholder {
    color: ${props => props.theme.colors.gray[500]};
  }
`
