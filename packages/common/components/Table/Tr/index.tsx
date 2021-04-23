import React from 'react'

import { Tr as TableRow, TableRowProps } from '@chakra-ui/react'

const Tr: React.FC<TableRowProps> = ({ children, ...rest }) => {
  return <TableRow {...rest}>{children}</TableRow>
}

export default Tr
