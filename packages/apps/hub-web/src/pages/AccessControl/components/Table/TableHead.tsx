import React, { useState } from 'react'

import Thead from '@psdhub/common/components/Table/Thead'
import { Tr, Th } from '@psdhub/common/components/Table'
type Headers = Array<'Solução' | 'Perfis' | 'Segmentos' | 'Escolas'>

const TableHead: React.FC = props => {
  const [headers, _] = useState<Headers>([
    'Solução',
    'Perfis',
    'Segmentos',
    'Escolas'
  ])
  return (
    <Thead flexDir="row" {...props}>
      <Tr>
        {headers.map(header => (
          <Th key={header}>{header}</Th>
        ))}
      </Tr>
    </Thead>
  )
}

export default TableHead
