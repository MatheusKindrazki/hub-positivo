import React from 'react'

import { Box, Button } from '@psdhub/common/components'
type EducationalLevelMenuProps = {
  educationalLevels: string[]
}
const EducationalLevelMenu: React.FC<EducationalLevelMenuProps> = ({
  educationalLevels
}) => {
  return (
    <Box d="flex" alignSelf="center" h="40px">
      {educationalLevels.map(level => (
        <Button textColor="gray.500" variant="unstyled" p="4" key={level}>
          {level}
        </Button>
      ))}
    </Box>
  )
}

export default EducationalLevelMenu
