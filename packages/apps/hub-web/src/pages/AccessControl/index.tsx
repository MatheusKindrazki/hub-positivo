import React from 'react'

import { theme } from '@psdhub/common/layout/styles'
import { Collapse, Box } from '@psdhub/common/components'

import ControlTable from '~/components/ControlTable'

import GlobalStyle from './styles'
import { mockedData } from './mock'

const AccessControl: React.FC = () => {
  return (
    <Box m="1rem">
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
              background: 'white'
            }}
          >
            <ControlTable solutions={categoria.solutions} />
          </Collapse>
        )
      })}
      <GlobalStyle theme={theme} />
    </Box>
  )
}

export default AccessControl
