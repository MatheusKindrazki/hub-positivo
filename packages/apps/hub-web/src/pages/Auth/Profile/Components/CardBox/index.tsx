import React, { ButtonHTMLAttributes } from 'react'

import iconTypes from './icons'
import { Container } from './styles'

type CardPropsButton = ButtonHTMLAttributes<HTMLButtonElement>

export type Icons =
  | 'professor'
  | 'gestor'
  | 'aluno'
  | 'família'
  | 'administrador'
  | 'editor'
  | 'colaborador'
const profiles = [
  'professor',
  'gestor',
  'aluno',
  'família',
  'administrador',
  'editor',
  'colaborador'
]

interface CardProps extends CardPropsButton {
  title: string
  icon: Icons
}

const CardBox: React.FC<CardProps> = ({ icon, title, onClick }) => {
  const hasIconProfile = profiles.includes(icon as string) ? icon : 'default'

  const IconType = iconTypes[hasIconProfile as Icons]

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
