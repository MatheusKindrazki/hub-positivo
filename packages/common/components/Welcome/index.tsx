import React from 'react'

import capitalizeFirstLetter from '../../utils/capitalize'
import { Avatar, Box, Heading } from '../index'

export interface WelcomeProps {
  size?: string
  fontSize?: string
  option?: 'name' | 'welcome'
  fontWeight?: string
  name: string
  avatar?: string
  profile?: string
  schoolName?: string
}

const Welcome: React.FC<WelcomeProps> = ({
  fontSize,
  fontWeight,
  option,
  size,
  name,
  avatar,
  schoolName,
  profile
}) => {
  return (
    <Box display="flex" alignItems="center" className="hub-welcome">
      <Avatar
        width={size || '3.5rem'}
        height={size || '3.5rem'}
        name={name || ''}
        color="#3C3C3C"
        src={avatar}
        background="#CFD8DC"
        borderColor="white"
        borderWidth="2px"
      />
      <Heading
        as="h4"
        ml="4"
        fontSize={fontSize || ['1.2rem', '1.875rem']}
        fontWeight={fontWeight || 'normal'}
        color={option === 'name' ? 'black' : 'white'}
      >
        {option === 'name' ? (
          <>{name || 'Usuário'}</>
        ) : (
          <>
            Olá, {name?.split(' ')[0] || 'Usuário'} 👋
            <Heading
              fontSize={['sm', 'md']}
              fontWeight="normal"
              textTransform="uppercase"
              as="p"
              color="blue.100"
              mt="1"
            >
              {profile || 'Perfil'} em{' '}
              {capitalizeFirstLetter(
                schoolName?.toLocaleLowerCase() || 'Escola'
              )}
            </Heading>
          </>
        )}
      </Heading>
    </Box>
  )
}

export default Welcome
