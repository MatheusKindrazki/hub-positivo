import React, { useContext } from 'react'

import { Button } from '@psdhub/common/components'

import ModalDeleteSolutionContext from '~/components/ModalDeleteSolution/context'

const DeleteSolutionButton: React.FC = () => {
  const { onOpen } = useContext(ModalDeleteSolutionContext)
  return (
    <Button variant="unstyled" color="red.400" onClick={onOpen}>
      EXCLUIR
    </Button>
  )
}

export default DeleteSolutionButton
