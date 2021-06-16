import styled from 'styled-components'

export const Container = styled.div`
  .hub-tree-level-1 {
    border-top: 1px solid;
    border-color: ${props => props.theme.colors.gray[400]};

    &:first-child {
      border: none;
    }
  }
`
