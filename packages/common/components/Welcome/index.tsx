import React from 'react'

import { Box, Heading } from '../index'

export interface WelcomeProps {
  size?: string
  fontSize?: string
  option?: 'name' | 'welcome'
  fontWeight?: string
  name?: string
  avatar?: string
  profile?: string
  schoolName?: string
  educational_stage?: string
}

const Welcome: React.FC<WelcomeProps> = ({
  fontSize,
  fontWeight,
  option,
  name
}) => {
  const welcomeText = `Olá ${
    name?.split(' ')[0] || 'Usuário'
  }, seja bem-vindo! 👋`

  return (
    <Box display="flex" alignItems="center" className="hub-welcome">
      <Heading
        as="h4"
        fontSize={fontSize || ['1.2rem', '1.875rem']}
        fontWeight={fontWeight || 'normal'}
        color="black"
      >
        {option === 'name' ? <>{name || 'Usuário'}</> : <>{welcomeText}</>}
      </Heading>
    </Box>
  )
}

export default Welcome
