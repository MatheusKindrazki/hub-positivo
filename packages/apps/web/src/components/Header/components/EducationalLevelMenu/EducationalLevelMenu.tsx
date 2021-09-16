import React from 'react'

import { Box, Button } from '@psdhub/common/components'

import { NavContainer } from './styles'

type EducationalLevelMenuProps = {
  educationalLevels: string[]
}
const EducationalLevelMenu: React.FC<EducationalLevelMenuProps> = ({
  educationalLevels
}) => {
  return (
    <NavContainer w="100%" d="flex" alignSelf="center">
      {educationalLevels.map(level => (
        <Box px="4" key={level} className="nav-container">
          <Button variant="unstyled" textColor="gray.500">
            {level}
          </Button>
          <Box as="span" className="divider" />
        </Box>
      ))}
    </NavContainer>
  )
}

export default EducationalLevelMenu
