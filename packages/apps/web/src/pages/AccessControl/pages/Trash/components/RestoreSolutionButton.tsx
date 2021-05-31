import React, { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { restoreSolutionRequest } from '~/store/modules/solutions/actions'

import { Button } from '@psdhub/common/components'

interface RestoreSolutionProps {
  id: string
}
const RestoreSolutionButton: React.FC<RestoreSolutionProps> = ({ id }) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(restoreSolutionRequest(id))
  }, [dispatch, id])

  return (
    <Button variant="unstyled" color="blue.500" onClick={handleClick}>
      RESTAURAR
    </Button>
  )
}

export default RestoreSolutionButton
