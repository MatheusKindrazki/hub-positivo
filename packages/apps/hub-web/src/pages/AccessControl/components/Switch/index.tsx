import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/singleSolution/types'
import { solutionPutRequest } from '~/store/modules/singleSolution/actions'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: PutSolutionData
}

const Switch: React.FC<SwitchProps> = ({ data }) => {
  console.log({ data })
  const dispatch = useDispatch()
  const { ativo } = data
  const [isChecked, setIsChecked] = useState(ativo)

  const handleCheck = async (check: boolean) => {
    dispatch(solutionPutRequest({ ...data, ativo: !check }))
    setIsChecked(!check)
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
