import React from 'react'

import {
  Tbody as TableBody,
  TableBodyProps,
  forwardRef
} from '@chakra-ui/react'

const Tbody = forwardRef<TableBodyProps, 'tbody'>(
  ({ children, ...rest }, ref) => (
    <TableBody {...rest} ref={ref}>
      {children}
    </TableBody>
  )
)
export default Tbody
