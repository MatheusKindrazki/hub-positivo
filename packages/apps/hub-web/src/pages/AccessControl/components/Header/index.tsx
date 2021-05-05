import React, { useContext } from 'react'

import { useLocation } from 'react-router'

import { Stack, Button, Box } from '@psdhub/common/components'

import ModalContext from '../ModalAddCategory/context'
import Modal from '../ModalAddCategory'

const Header: React.FC = () => {
  const { onOpen } = useContext(ModalContext)
  const { pathname } = useLocation()

  return (
    <>
      <Modal />
      <Stack direction={['column', 'column', 'row']} spacing="auto" m="2">
        <Box>
          <Button
            color="blue.500"
            bg="transparent"
            borderBottomWidth="medium"
            borderBottomRadius="none"
            _hover={{ background: 'transparent' }}
            borderColor={
              pathname === '/controle-de-acessos' ? 'blue.500' : 'transparent'
            }
          >
            Soluções
          </Button>
          <Button
            _hover={{ background: 'transparent' }}
            color="blue.500"
            bg="transparent"
            borderBottomWidth="medium"
            borderBottomRadius="none"
            borderColor={
              pathname === '/controle-de-acessos/lixeira'
                ? 'blue.500'
                : 'transparent'
            }
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
            minW="11.25rem"
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
            minW="11.25rem"
          >
            Adicionar Solução
          </Button>
        </Box>
      </Stack>
    </>
  )
}

export default Header
