import React from 'react'

import { Switch as SwitchButton, SwitchProps } from '@chakra-ui/react'

import GlobalStyle from './styles'

const Switch: React.FC<SwitchProps> = ({ children, ...rest }) => {
  return (
    <>
      <SwitchButton {...rest} className="switch-button">
        {children}
      </SwitchButton>
      <GlobalStyle />
    </>
  )
}
export default Switch
