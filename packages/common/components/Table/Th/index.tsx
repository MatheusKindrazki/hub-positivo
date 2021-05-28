import React from 'react'

import {
  Th as TableColumnHeader,
  TableColumnHeaderProps
} from '@chakra-ui/react'

const Tr: React.FC<TableColumnHeaderProps> = ({ children, ...rest }) => {
  return <TableColumnHeader {...rest}>{children}</TableColumnHeader>
}

export default Tr
