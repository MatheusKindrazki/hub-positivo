import React from 'react'

import { useHistory } from 'react-router'

import { useDispatch } from 'react-redux'

import {
  getAllProfilePermissionsRequest,
  profilePermissionsBySolutionRequest,
  schoolPermissionsBySolutionRequest
} from '~/store/modules/permissions/actions'

import { Box } from '@psdhub/common/components'

interface EditButtonProps {
  url: string
  solutionId: string
}

const EditButton: React.FC<EditButtonProps> = ({ url, solutionId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick = () => {
    dispatch(profilePermissionsBySolutionRequest(solutionId))
    dispatch(schoolPermissionsBySolutionRequest(solutionId))
    dispatch(getAllProfilePermissionsRequest())
    history.push(url)
  }
  return (
    <Box
      width="auto"
      fontWeight="500"
      color="blue.500"
      cursor="pointer"
      as="a"
      onClick={() => handleClick()}
    >
      EDITAR
    </Box>
  )
}

export default EditButton
