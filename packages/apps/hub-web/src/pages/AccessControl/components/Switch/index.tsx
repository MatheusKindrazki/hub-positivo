import React, { useState } from 'react'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  activated: boolean
}

const Switch: React.FC<SwitchProps> = ({ activated }) => {
  const [isChecked, setIsChecked] = useState(activated)
  return (
    <SwitchUI
      padding="1"
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  )
}

export default Switch
