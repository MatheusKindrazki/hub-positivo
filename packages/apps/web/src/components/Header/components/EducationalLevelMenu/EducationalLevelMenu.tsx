import React from 'react'

import { Box } from '@psdhub/common/components'
type EducationalLevelMenuProps = {
  educationalLevels: string[]
}
const EducationalLevelMenu: React.FC<EducationalLevelMenuProps> = ({
  educationalLevels
}) => {
  return (
    <Box px="10%" d="flex" alignSelf="center">
      {educationalLevels.map(level => (
        <Box key={level} d="flex" flexDir="column">
          {level}
        </Box>
      ))}
    </Box>
  )
}

export default EducationalLevelMenu
