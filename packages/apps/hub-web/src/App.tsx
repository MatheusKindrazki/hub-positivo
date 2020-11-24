import React from 'react'

import ThemeProvider from '@hub/common/layout/Provider'

import Routes from '~/routes'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  )
}

export default App
