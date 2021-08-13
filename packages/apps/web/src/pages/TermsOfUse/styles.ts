import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 1rem;

  margin-bottom: 2rem;

  @media (min-width: 1400px) {
    margin: 0 auto;
    margin-bottom: 5rem;
  }

  padding-top: 1.5rem;

  h1 {
    font-size: 2rem;
    font-style: normal;
    font-weight: bold;
  }
`

export const Main = styled.div`
  margin-top: 1.125rem;
  padding: 1.0625rem;
  padding-top: 1.5rem;

  background-color: white;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};

  h2,
  h3,
  h4 {
    font-style: normal;
    font-weight: bold;
    margin-bottom: 0.625rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 1.5rem;
  }

  table {
    padding: 5px;

    width: 100%;
    overflow: hidden;
    border-collapse: separate;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray[400]};

    thead {
      box-shadow: 0px 1px 0px 0px ${({ theme }) => theme.colors.gray[400]};
    }

    tr {
      box-shadow: 0px 1px 0px 0px ${({ theme }) => theme.colors.gray[400]};

      &:last-child {
        box-shadow: none;
      }
    }

    td,
    th {
      border: none;
    }
  }
`
