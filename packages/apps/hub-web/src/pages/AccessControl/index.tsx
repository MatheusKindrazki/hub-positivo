import React from 'react'

import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { mockedData } from './mock'
import ControlTable from './components/Table'

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
              overflow: 'auto'
            }}
          >
            <ControlTable solutions={categoria.solutions} />
          </Collapse>
        )
      })}
    </Container>
  )
}

export default AccessControl
