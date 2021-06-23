import React from 'react'

import { Td as TableData, TableCellProps } from '@chakra-ui/react'

const Td: React.FC<TableCellProps> = ({ children, ...rest }) => {
  return <TableData {...rest}>{children}</TableData>
}

export type { TableCellProps }

export default Td
