import React from 'react'

import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { columns, data, mockedData } from './mockTest'
import Table from './components/Table'

const AccessControl: React.FC = () => {
  return (
    <Container m="1">
      {mockedData.map(categoria => {
        return (
          <Collapse
            defaultIsOpen={false}
            grid={false}
            key={categoria.name}
            nome={categoria.name}
            id="1"
            cor="white"
            css={{
              background: 'white',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}
          >
            <Table columns={columns} data={data} />
          </Collapse>
        )
      })}
    </Container>
  )
}

export default AccessControl
