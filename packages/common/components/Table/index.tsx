import React from 'react'

import classNames from 'classnames'

import { Table as TableUI, TableProps as Props } from '@chakra-ui/react'

import Tr from './Tr'
import Thead from './Thead'
import Th from './Th'
import Tfoot from './Tfoot'
import Td from './Td'
import Tbody from './Tbody'

export interface Columns {
  property: string
  header?: string | React.ReactNode
  render?: (props: any) => void
}

export type Data = any
export interface TableProps extends Props {
  columns: Columns[]
  data?: Data
  className?: string
}

const Table: React.FC<TableProps> = ({ columns, data, className }) => {
  return (
    <TableUI className={classNames(className, { 'hub-table': true })}>
      <Thead>
        <Tr>
          {columns?.map(({ header }, index) => (
            <Th key={index}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((e: any, index: number) => (
          <Tr
            key={index}
            className={classNames({
              'hub-table-even': index % 2 === 0,
              'hub-table-odd': index % 2 !== 0
            })}
          >
            {columns?.map((c, i) => {
              return (
                <Td key={i}>
                  {c?.render ? c.render(e) : e[c.property as any]}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </TableUI>
  )
}

export default Table
export { Thead, Td, Th, Tr, Tfoot, Tbody, TableUI }
