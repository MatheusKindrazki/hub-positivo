import React from 'react'

import { Box, Button } from '@psdhub/common/components'

import { MenuContainer } from './styles'

export type Handler = (e: string) => void

type EducationalLevelMenuProps = {
  educationalLevels: string[]
  selectedLevel: string
  handler: Handler
}
const EducationalLevelMenu: React.FC<EducationalLevelMenuProps> = ({
  educationalLevels,
  selectedLevel,
  handler
}) => {
  return (
    <MenuContainer d="flex">
      {educationalLevels.map(level => (
        <Box px="2.5" key={level} className="nav-container">
          <Button
            onClick={() => handler(level) as any}
            className={level === selectedLevel ? 'active level' : 'level'}
            alignSelf="self-end"
            variant="unstyled"
            textColor="gray.500"
            fontFamily="TTNORMS"
            fontWeight="500"
            height="12"
          >
            {level}
          </Button>
        </Box>
      ))}
    </MenuContainer>
  )
}

export default EducationalLevelMenu
