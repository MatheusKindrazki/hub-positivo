import React, { ButtonHTMLAttributes } from 'react'

import iconTypes from './icons'
import { Container } from './styles'

type CardPropsButton = ButtonHTMLAttributes<HTMLButtonElement>

type Icon = 'professor' | 'gestor' | 'aluno' | 'familia' | 'administrador'
interface CardProps extends CardPropsButton {
  title: string
  icon?: 'professor' | 'gestor' | 'aluno' | 'familia' | 'administrador' | string
}

const CardBox: React.FC<CardProps> = ({ icon, title, onClick }) => {
  const enableIcon = [
    'professor',
    'gestor',
    'aluno',
    'familia',
    'administrador'
  ]
  const HasChoiceIcon = enableIcon.includes(icon as string)

  const getIcon = (icon as unknown) as Icon

  const conditionalIcon = HasChoiceIcon ? getIcon : 'default'

  const IconType = iconTypes[conditionalIcon]

  return (
    <Container onClick={onClick}>
      <div className="round">
        <IconType color="white" size="24px" />
      </div>
      <p>{title}</p>
    </Container>
  )
}

export default CardBox
