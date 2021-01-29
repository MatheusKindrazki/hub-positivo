import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { productRequest } from '~/store/modules/products/actions'
import { setEducationalStage } from '~/store/modules/educationalStage/actions'

import { useMediaQuery } from '@hub/common/layout/styles'
import { Box, Select } from '@hub/common/components'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: Store.State) => state.profile)

  const [isMobile] = useMediaQuery('(max-width: 480px)')

  const { levels, level } = useSelector(
    (state: Store.State) => state.educationalStage
  )

  const handleSelect = useCallback(
    data => {
      dispatch(setEducationalStage(data.label))

      dispatch(productRequest({}))
    },
    [dispatch]
  )

  if (!levels?.length || name !== 'Professor') return null

  return (
    <Box mb={isMobile ? 5 : 0}>
      <Select
        variant="blue-transparent"
        value={{ label: level, value: level }}
        options={levels}
        onChange={e => handleSelect(e)}
      />
    </Box>
  )
}

export default Filter
