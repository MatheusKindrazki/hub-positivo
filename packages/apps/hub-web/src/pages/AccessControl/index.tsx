import React from 'react'

import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { mockedData } from './mock'
import ControlTable from './components/ControlTable'

const AccessControl: React.FC = () => {
  return (
    <Container>
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
              overflow: 'auto'
            }}
          >
            <ControlTable
              overflowX="auto"
              borderWidth="thin"
              borderColor="gray.500"
              borderRadius="md"
              headers={['Solução', 'Perfis', 'Segmentos', 'Escolas']}
              solutions={categoria.solutions}
              margin="2"
            />
          </Collapse>
        )
      })}
    </Container>
  )
}

export default AccessControl
