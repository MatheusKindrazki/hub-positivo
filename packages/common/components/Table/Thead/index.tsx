import React from 'react'

import { Thead as TableHead, TableHeadProps } from '@chakra-ui/react'

const Thead: React.FC<TableHeadProps> = ({ children, ...rest }) => {
  return <TableHead {...rest}>{children}</TableHead>
}

export default Thead
