import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@hub/common/components'

import { setLevel } from '~/store/modules/levelEducation/actions'
import { productRequest } from '~/store/modules/products/actions'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: Store.State) => state.profile)

  const { levels, level } = useSelector(
    (state: Store.State) => state.levelEducation
  )

  const handleSelect = useCallback(
    data => {
      dispatch(setLevel(data.label))

      dispatch(productRequest({}))
    },
    [dispatch]
  )

  if (!levels?.length || name !== 'Professor') return null

  return (
    <Select
      variant="blue-transparent"
      defaultValue={{ label: level, value: level }}
      options={levels}
      onChange={e => handleSelect(e)}
    />
  )
}

export default Filter
