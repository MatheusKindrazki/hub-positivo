import React, { useContext } from 'react'

import { useHistory } from 'react-router'

import { Stack, Button, Box } from '@psdhub/common/components'

import history from '~/services/history'

import ModalContext from '../ModalAddCategory/context'
import Modal from '../ModalAddCategory'

const Header: React.FC = () => {
  const { onOpen } = useContext(ModalContext)
  const { location } = useHistory()

  return (
    <>
      <Modal />
      <Stack direction={['column', 'column', 'row']} spacing="auto" m="2">
        <Box>
          <Button
            variant="unstyled"
            m="1"
            p="3"
            color="blue.500"
            borderBottomWidth="0.1875rem"
            borderBottomRadius="none"
            borderColor={
              location.pathname === '/controle-de-acessos'
                ? 'blue.500'
                : 'transparent'
            }
            onClick={() => history.push('/controle-de-acessos')}
          >
            SOLUÇÕES
          </Button>
          <Button
            m="1"
            variant="unstyled"
            p="3"
            color="blue.500"
            borderBottomWidth="0.1875rem"
            borderBottomRadius="none"
            borderColor={
              location.pathname === '/controle-de-acessos/lixeira'
                ? 'blue.500'
                : 'transparent'
            }
            onClick={() => history.push(location.pathname + '/lixeira')}
          >
            LIXEIRA
          </Button>
        </Box>
        {location.pathname === '/controle-de-acessos' && (
          <Box>
            <Button
              variant="unstyled"
              m="1"
              color="blue.500"
              borderRadius="sm"
              borderColor="blue.500"
              borderWidth="thin"
              minW="11.25rem"
              onClick={onOpen}
            >
              Adicionar Categoria
            </Button>
            <Button
              variant="unstyled"
              m="1"
              color="blue.500"
              borderRadius="sm"
              borderColor="blue.500"
              borderWidth="thin"
              minW="11.25rem"
            >
              Adicionar Solução
            </Button>
          </Box>
        )}
      </Stack>
    </>
  )
}

export default Header
