import React from 'react'

import { Switch as SwitchButton, SwitchProps } from '@chakra-ui/react'

const Switch: React.FC<SwitchProps> = ({ children, ...rest }) => {
  return (
    <SwitchButton {...rest} className="switch-button">
      {children}
    </SwitchButton>
  )
}

export { SwitchProps }
export default Switch
