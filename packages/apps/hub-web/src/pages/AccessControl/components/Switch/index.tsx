import React from 'react'

import { useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/solutions/types'
import { solutionPutRequest } from '~/store/modules/solutions/actions'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: PutSolutionData
  index: number
  onChangeSwitch(index: number): void
}

const Switch: React.FC<SwitchProps> = ({ data, onChangeSwitch, index }) => {
  const dispatch = useDispatch()
  const { id, ativo } = data

  const onChange = () => {
    onChangeSwitch(index)
    dispatch(solutionPutRequest({ ...data, ativo: !ativo }))
  }

  return (
    <SwitchUI
      key={id}
      defaultChecked={ativo === true}
      padding="1"
      className="solution-switch"
      onChange={onChange}
    />
  )
}

export default Switch
