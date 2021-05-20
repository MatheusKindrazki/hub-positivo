import React, { useState, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/solutions/types'
import { solutionPutRequest } from '~/store/modules/solutions/actions'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: PutSolutionData
}

const Switch: React.FC<SwitchProps> = ({ data }) => {
  const dispatch = useDispatch()
  const { ativo } = data
  const [isChecked, setIsChecked] = useState(ativo)

  const handleCheck = useCallback(
    (check: boolean) => {
      dispatch(solutionPutRequest({ ...data, ativo: !check }))
      setIsChecked(!check)
    },
    [dispatch, data]
  )
  return (
    <SwitchUI
      padding="1"
      isChecked={isChecked}
      onChange={() => handleCheck(isChecked)}
      className="solution-switch"
    />
  )
}

export default Switch
