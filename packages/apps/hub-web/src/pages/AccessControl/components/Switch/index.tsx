import React, { useState } from 'react'

import { Product } from '~/store/modules/products/types'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: Product
}

const Switch: React.FC<SwitchProps> = ({ data }) => {
  const { ativo } = data
  const [isChecked, setIsChecked] = useState(ativo)

  const handleCheck = (isChecked: boolean) => {
    console.log({ ...data, ativo: !isChecked })
    setIsChecked(!isChecked)
  }
  return (
    <SwitchUI
      padding="1"
      isChecked={isChecked}
      onChange={() => handleCheck(isChecked)}
    />
  )
}

export default Switch
