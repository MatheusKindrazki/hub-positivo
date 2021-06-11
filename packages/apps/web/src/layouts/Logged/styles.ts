import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 98vh;
  background: ${({ theme }) => {
    return theme.colors?.gray[300]
  }};
`
