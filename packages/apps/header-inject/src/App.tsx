import React from 'react'

import { Heading } from '@hub/common/components'
import { HubProvider } from '@hub/common/layout'

const App: React.FC = () => {
  return (
    <HubProvider>
      <div className="header-hub">
        <Heading>Ola Mundo</Heading>
      </div>
    </HubProvider>
  )
}

export default App
