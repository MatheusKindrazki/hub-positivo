import React from 'react'

import { Text, Box } from '@psdhub/common/components'

type SchoolLabelProps = {
  schoolName: string
}

const SchoolLabel: React.FC<SchoolLabelProps> = ({ schoolName }) => {
  return (
    <Box width="100%" bg="blue.500">
      <Box maxWidth="1400px" margin="0 auto">
        <Text
          fontWeight="500"
          h="6"
          textColor="white"
          fontSize="12px"
          py="1"
          px="2"
          fontFamily="TTNORMS"
        >
          {schoolName}
        </Text>
      </Box>
    </Box>
  )
}

export default SchoolLabel
