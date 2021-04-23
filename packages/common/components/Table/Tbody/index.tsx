import React from 'react'

import { Tbody as TableBody, TableBodyProps } from '@chakra-ui/react'

const Tbody: React.FC<TableBodyProps> = ({ children, ...rest }) => {
  return <TableBody {...rest}>{children}</TableBody>
}

export default Tbody
