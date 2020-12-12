import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Box, Select } from '@hub/common/components'
import { useMediaQuery } from '@hub/common/layout/styles'

import { setLevel } from '~/store/modules/levelEducation/actions'
import { productRequest } from '~/store/modules/products/actions'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: Store.State) => state.profile)

  const [isMobile] = useMediaQuery('(max-width: 480px)')

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
    <Box mb={isMobile ? 5 : 0}>
      <Select
        variant="blue-transparent"
        defaultValue={{ label: level, value: level }}
        options={levels}
        onChange={e => handleSelect(e)}
      />
    </Box>
  )
}

export default Filter
