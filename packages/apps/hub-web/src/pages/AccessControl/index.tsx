import React from 'react'

import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { columns, data, apiReturn } from './mockTest'
import Table from './components/Table'

const AccessControl: React.FC = () => {
  return (
    <Container m="1">
      {apiReturn?.map((categoria: any) => {
        return (
          <Collapse
            defaultIsOpen={false}
            grid={false}
            key={categoria.nome}
            nome={categoria.nome}
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
