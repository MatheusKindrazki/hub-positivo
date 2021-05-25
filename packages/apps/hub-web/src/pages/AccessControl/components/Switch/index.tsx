import React from 'react'

// import { useDispatch } from 'react-redux'

// import { solutionPutRequest } from '~/store/modules/solutions/actions'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: any
  index: number
  onChangeSwitch(e: any, index: number): void
}

const Switch: React.FC<SwitchProps> = ({ data, onChangeSwitch, index }) => {
  // const dispatch = useDispatch()
  const { id, ativo } = data

  return (
    <SwitchUI
      key={id}
      defaultChecked={ativo === true}
      padding="1"
      className="solution-switch"
      onChange={() => onChangeSwitch(index, { ...data, ativo: !ativo })}
    />
  )
}

export default Switch
