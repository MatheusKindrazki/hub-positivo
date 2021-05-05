import React from 'react'

import HubProvider from '@psdhub/common/layout/Provider'

const App: React.FC = () => {
  return (
    <HubProvider cssVarPrefix="hub-easyauth">
      <div>brasil</div>
    </HubProvider>
  )
}

export default App
