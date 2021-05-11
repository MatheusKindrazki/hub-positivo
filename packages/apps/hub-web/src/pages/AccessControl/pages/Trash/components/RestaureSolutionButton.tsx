import React, { useCallback } from 'react'

import { useDispatch } from 'react-redux'

import { solutionRestaureRequest } from '~/store/modules/solutions/actions'

import { Button } from '@psdhub/common/components'

interface RestaureSolutionButtonProps {
  id: string
}
const RestaureSolutionButton: React.FC<RestaureSolutionButtonProps> = ({
  id
}) => {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(solutionRestaureRequest(id))
  }, [dispatch, id])

  return (
    <Button variant="unstyled" color="blue.500" onClick={handleClick}>
      RESTAURAR
    </Button>
  )
}

export default RestaureSolutionButton
