import React from 'react'

import Td, { TableCellProps } from '@psdhub/common/components/Table/Td'
import { Switch, Box } from '@psdhub/common/components'

export interface Solution {
  order: number
  name: string
  profiles: string[]
  segments: string[]
  schools: string[]
}

interface TdataProps extends TableCellProps {
  solution: Solution
}

const Tdata: React.FC<TdataProps> = ({ solution }) => {
  return (
    <>
      <Td>{solution.name}</Td>
      <Td>
        {solution.profiles.map(profile => (
          <Box key={profile}>{profile}</Box>
        ))}
      </Td>
      <Td>
        {solution.segments.map(segment => (
          <Box key={segment}>{segment}</Box>
        ))}
      </Td>
      <Td>
        {solution.schools.map(school => (
          <Box key={school}>{school}</Box>
        ))}
      </Td>
      <Td textTransform="uppercase" color="blue.500" fontWeight="500">
        Editar
      </Td>
      <Td>
        <Switch color="blue.500" />
      </Td>
    </>
  )
}

export default Tdata
