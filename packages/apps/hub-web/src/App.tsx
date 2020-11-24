import React from 'react'

import Input from '@hub/common/components/Input'
import ThemeProvider from '@hub/common/layout/Provider'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <h1>Ola mundo</h1>
      <Input />
    </ThemeProvider>
  )
}

export default App
