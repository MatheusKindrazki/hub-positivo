import React from 'react'

import { Tfoot as TableFoot, TableFooterProps } from '@chakra-ui/react'

const Tfoot: React.FC<TableFooterProps> = ({ children, ...rest }) => {
  return <TableFoot {...rest}>{children}</TableFoot>
}

export default Tfoot
