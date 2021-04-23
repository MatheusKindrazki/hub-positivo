import React from 'react'

import Table, {
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@psdhub/common/components/Table'
import Box, { BoxProps } from '@psdhub/common/components/Box'
import { Switch } from '@psdhub/common/components'

interface Solution {
  name: string
  profiles: string[]
  order: number
  segments: string[]
  schools: string[]
}

export interface TableProps extends BoxProps {
  solutions: Solution[]
}

const ControlTable: React.FC<TableProps> = ({ solutions, ...rest }) => {
  return (
    <Box
      overflowX="auto"
      {...rest}
      m="0.75rem"
      borderWidth="0.0625rem"
      borderRadius="sm"
      borderColor="gray.500"
    >
      <Table size="sm" variant="unstyled">
        <Thead width="100%">
          <Tr>
            <Th>Solução</Th>
            <Th>Perfil</Th>
            <Th>Segmentos</Th>
            <Th>Escolas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {solutions.map(solution => {
            return (
              <Tr key={solution.name}>
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
                <Td textTransform="uppercase">Editar</Td>
                <Td>
                  <Switch />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ControlTable
