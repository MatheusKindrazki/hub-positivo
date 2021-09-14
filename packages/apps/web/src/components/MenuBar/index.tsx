import React from 'react'

import { HeaderProvider } from '~/components/Header/context'

import { DesktopMenu } from './components'

const MenuBar: React.FC = () => {
  return (
    <HeaderProvider>
      <DesktopMenu />
    </HeaderProvider>
  )
}

export default MenuBar
