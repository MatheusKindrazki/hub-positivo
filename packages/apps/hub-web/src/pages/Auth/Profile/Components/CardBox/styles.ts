import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  padding: 10px 3px;

  margin-top: 15px;
  margin-bottom: 15px;

  position: relative;
  display: flex;
  align-items: center;

  border: none !important;
  background: transparent !important;
  outline: none !important;

  &:hover {
    &:after {
      opacity: 0.2;
    }
  }

  &:after {
    content: '';
    position: absolute;
    left: -25px;
    background: ${({ theme }) => theme.colors.blue[500]};
    width: calc(100% + 50px);
    height: calc(100% + 15px);
    transition: all 0.2s ease-in-out;
    opacity: 0;
    pointer-events: none;
  }

  &:before {
    position: absolute;
    display: block;
    left: -24px;
    top: -7px;
    content: '';
    width: calc(100% + 50px);
    height: 1px;
    background: #d9d9d9;
  }

  .round {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.blue[500]};
    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    margin-right: 15px;
  }

  p {
    margin: 0px !important;
    font-family: Nunito;
    font-style: normal;
    font-weight: bold !important;
    font-size: 18px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.blue[500]}!important;
  }
`
