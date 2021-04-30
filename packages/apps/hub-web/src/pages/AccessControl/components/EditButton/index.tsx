import React from 'react'

import { useHistory } from 'react-router'

import { Box } from '@psdhub/common/components'

interface EditButtonProps {
  url: string
}

const EditButton: React.FC<EditButtonProps> = ({ url }) => {
  const history = useHistory()
  const handleClick = () => {
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
