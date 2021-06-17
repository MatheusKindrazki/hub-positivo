import React, { useRef, useCallback } from 'react'

import { useHistory } from 'react-router'

import { useDispatch } from 'react-redux'

import { schoolGetAllRequest } from '~/store/modules/school/actions'
import { getAllProfilePermissionsRequest } from '~/store/modules/permissions/actions'
import { categoryGetAllRequest } from '~/store/modules/category/actions'

import { Button, Box } from '@psdhub/common/components'

import ModalAddCategory, { ModalHandler } from '~/components/ModalAddCategory'

import { buttonStyles } from './styles'

const OptionButton: React.FC = () => {
  const dispatch = useDispatch()
  const modalRef = useRef<ModalHandler>(null)

  const openModal = useCallback(() => {
    modalRef.current?.onOpen()
  }, [])

  const { push } = useHistory()
  return (
    <Box>
      <ModalAddCategory ref={modalRef} />

      <Button textTransform="uppercase" {...buttonStyles} onClick={openModal}>
        Adicionar Categoria
      </Button>
      <Button
        textTransform="uppercase"
        {...buttonStyles}
        onClick={() => {
          dispatch(schoolGetAllRequest())
          dispatch(getAllProfilePermissionsRequest())
          dispatch(categoryGetAllRequest())
          push('/controle-de-acessos/criar')
        }}
      >
        Adicionar Solução
      </Button>
    </Box>
  )
}

export default OptionButton