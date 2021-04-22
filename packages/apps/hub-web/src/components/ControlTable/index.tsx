import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td, Switch } from '@chakra-ui/react'

interface Solution {
  name: string
  profiles: string[]
  order: number
  segments: string[]
  schools: string[]
}

export interface TableProps {
  solutions: Solution[]
}

const ControlTable: React.FC<TableProps> = ({ solutions, ...rest }) => {
  return (
    <>
      <Table size="sm" {...rest}>
        <Thead>
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
                  {solution.profiles.map(profile => {
                    return <p key={profile}>{profile}</p>
                  })}
                </Td>
                <Td>
                  {solution.segments.map(segment => {
                    return <p key={segment}>{segment}</p>
                  })}
                </Td>
                <Td>
                  {solution.schools.map(school => {
                    return <p key={school}>{school}</p>
                  })}
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
    </>
  )
}

export default ControlTable
