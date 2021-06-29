import React from 'react'

import classNames from 'classnames'

import { Switch as SwitchButton, SwitchProps } from '@chakra-ui/react'

const Switch: React.FC<SwitchProps> = ({ children, className, ...rest }) => {
  return (
    <SwitchButton
      {...rest}
      data-testid="switch-button"
      className={classNames(className, { 'switch-button': true })}
    >
      {children}
    </SwitchButton>
  )
}

export type { SwitchProps }
export default Switch
