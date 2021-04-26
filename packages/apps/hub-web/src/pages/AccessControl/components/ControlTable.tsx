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

export interface Solution {
  order: number
  name: string
  profiles: string[]
  segments: string[]
  schools: string[]
}

export interface TableProps extends BoxProps {
  solutions: Solution[]
  headers: Array<'Solução' | 'Perfis' | 'Segmentos' | 'Escolas'>
}

const ControlTable: React.FC<TableProps> = ({
  solutions,
  headers,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Table size="sm" variant="unstyled">
        <Thead>
          {headers.map(e => (
            <Th key={e}>{e}</Th>
          ))}
        </Thead>
        <Tbody>
          {solutions.map(solution => {
            return (
              <Tr key={solution.name} className="tr-access-control">
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
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ControlTable
