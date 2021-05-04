import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { UpdateSolutionData } from '~/store/modules/updateSolution/types'
import { solutionUpdateRequest } from '~/store/modules/updateSolution/actions'

import { SwitchProps as SwitchPropsUI } from '@psdhub/common/components/Switch'

import SwitchUI from './styles'

export interface SwitchProps extends SwitchPropsUI {
  data: UpdateSolutionData
}

const Switch: React.FC<SwitchProps> = ({ data }) => {
  const dispatch = useDispatch()
  const { ativo } = data
  const [isChecked, setIsChecked] = useState(ativo)

  const handleCheck = async (check: boolean) => {
    try {
      dispatch(solutionUpdateRequest({ ...data, ativo: !check }))
      setIsChecked(!check)
    } catch (e) {
      console.log(e)
      setIsChecked(check)
    }
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
