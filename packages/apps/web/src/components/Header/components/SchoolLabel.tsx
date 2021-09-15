import React from 'react'

import Headroom from 'react-headroom'

import { Text } from '@psdhub/common/components'

type SchoolLabelProps = {
  schoolName: string
}

const SchoolLabel: React.FC<SchoolLabelProps> = ({ schoolName }) => {
  return (
    <Headroom>
      <Text
        bg="blue.500"
        fontWeight="500"
        h="6"
        textColor="white"
        fontSize="12px"
        py="1"
        px="10%"
        fontFamily="TTNORMS"
      >
        {schoolName}
      </Text>
    </Headroom>
  )
}

export default SchoolLabel
