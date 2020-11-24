import React, { useContext, useEffect } from 'react'

import Input from '@hub/common/components/Input'
import ThemeProvider from '@hub/common/layout/Provider'
import ThemeProviderContext from '@hub/common/layout/Provider/context'

const App: React.FC = () => {
  const { theme } = useContext(ThemeProviderContext)

  useEffect(() => {
    setTimeout(() => {
      theme({ profile: 'administrador' })
    }, 2000)
  }, [])

  return (
    <ThemeProvider>
      <h1>Ola mundo</h1>
      <Input />
    </ThemeProvider>
  )
}

export default App
