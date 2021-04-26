import React from 'react'

import { Switch as SwitchButton, SwitchProps } from '@chakra-ui/react'

const Switch: React.FC<SwitchProps> = ({ children, ...rest }) => {
  return (
    <SwitchButton {...rest} className="switch-button">
      {children}
    </SwitchButton>
  )
}
export default Switch
