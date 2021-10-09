import styled, { css } from 'styled-components'

import { MenuButton } from '@psdhub/common/components/Menu'
interface Props {
  hasNew: boolean
}

export const ButtonContainer = styled(MenuButton)<Props>`
  color: ${({ theme }) => theme.colors.blue[500]};
  margin-right: 0.5rem;
  margin-top: 0.1rem;
  cursor: pointer;

  transition: all 0.4s ease-in-out;

  transform: scale(1);

  &:after {
    counter-reset: x var(--quantity-notifications);
    content: counter(x);

    position: absolute;
    width: 0rem;
    height: 0rem;
    top: -0.2rem;
    right: -15px;
    background-color: ${props => props.theme.colors.blue[500]};
    border-radius: 100%;
    font-size: 10px;
    font-weight: bold;
    color: white;

    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-delay: 0.2s;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }

  ${props =>
    props.hasNew &&
    css`
      position: relative;
      width: fit-content;
      margin-right: 1.4rem;
      transform: scale(1.1);
      &:after {
        width: 1.2rem;
        height: 1.2rem;
        background-color: ${props => props.theme.colors.red[500]};
      }
    `}
`
