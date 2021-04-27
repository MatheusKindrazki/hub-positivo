import React from 'react'

import { Tr as TableRow, TableRowProps, forwardRef } from '@chakra-ui/react'

export { TableRowProps }

const Tr = forwardRef<TableRowProps, 'tr'>(({ children, ...rest }, ref) => (
  <TableRow {...rest} className="tr-access-control" ref={ref}>
    {children}
  </TableRow>
))

export default Tr
