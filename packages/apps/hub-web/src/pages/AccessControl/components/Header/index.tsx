import React, { useContext } from 'react'

import { Flex, Button, Box } from '@psdhub/common/components'

import ModalContext from '../ModalAddCategory/context'
import Modal from '../ModalAddCategory'

const Header = () => {
  const { onOpen } = useContext(ModalContext)

  return (
    <>
      <Modal />
      <Flex justifyContent="space-between">
        <Box flexDirection="row">
          <Button
            m="1"
            color="blue.500"
            bg="transparent"
            borderColor="blue.500"
            borderBottomWidth="medium"
            borderBottomRadius="none"
          >
            Soluções
          </Button>
          <Button
            m="1"
            color="blue.500"
            bg="transparent"
            borderColor="blue.500"
            borderBottomWidth="medium"
            borderBottomRadius="none"
          >
            Lixeira
          </Button>
        </Box>
        <Box>
          <Button
            m="1"
            color="blue.500"
            bg="transparent"
            borderRadius="sm"
            borderColor="blue.500"
            borderWidth="thin"
            onClick={onOpen}
          >
            Adicionar Categoria
          </Button>
          <Button
            m="1"
            color="blue.500"
            bg="transparent"
            borderRadius="sm"
            borderColor="blue.500"
            borderWidth="thin"
          >
            Adicionar Solução
          </Button>
        </Box>
      </Flex>
    </>
  )
}

export default Header
