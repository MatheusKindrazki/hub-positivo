import React, { ButtonHTMLAttributes } from 'react';

// import iconTypes from './icons';
import { Container } from './styles';

type CardPropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

interface CardProps extends CardPropsButton {
  title: string;
  icon?: 'professor' | 'gestor' | 'aluno' | 'familia';
}

const CardBox: React.FC<CardProps> = ({ title, onClick }) => {
  // type Icon = typeof iconTypes.aluno;

  // const IconType = iconTypes[icon || 'gestor'] as Icon;

  return (
    <Container onClick={onClick}>
      <div className="round">
        {/* <IconType color="white" size="24px" /> */}
      </div>
      <p>{title}</p>
    </Container>
  );
};

export default CardBox;
