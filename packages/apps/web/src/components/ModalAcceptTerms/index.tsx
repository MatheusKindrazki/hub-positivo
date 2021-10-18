import React, { useState, useEffect, useCallback } from 'react'

import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { acceptTermsRequest } from '~/store/modules/acceptTerms/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Text, Checkbox } from '@psdhub/common/components'

import history from '~/services/history'

import GlobalStyles from './styles'

const IGNORE_PATH = '/politica-de-privacidade'

let modalAlreadyOpened = false

const ModalAcceptTerms: React.FC = () => {
  const { pathname } = useLocation()

  const [accept, setAccept] = useState(false)

  const dispatch = useDispatch()

  const { accepted, checking, loading } = useSelector(
    (state: Store.State) => state.acceptTerms
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!accepted && checking && !loading && !modalAlreadyOpened) {
      modalAlreadyOpened = true
      onOpen()
    } else {
      onClose()
    }

    return () => {
      modalAlreadyOpened = false
    }
  }, [accepted, checking, loading, onClose, onOpen])

  useEffect(() => {
    if (pathname === IGNORE_PATH) {
      if (isOpen) {
        onClose()
      }
    }
  }, [accepted, onOpen, checking, pathname, isOpen, onClose])

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleAcceptTerms = useCallback(() => {
    dispatch(acceptTermsRequest())
  }, [dispatch])

  return (
    <>
      <Modal
        title="Atualização da Política de Privacidade"
        isCentered
        autoFocus
        className="modal-politica-de-privacidade"
        maxW={isDesktop ? '26.5rem' : '20rem'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box
          d="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDir="column"
        >
          <Text my="0rem" mb=".5rem" fontSize="0.9375rem" lineHeight="20px">
            Atualizamos nossa política de privacidade. É preciso que você aceite
            os termos para continuar. Você poderá ver a nova política de
            privacidade clicando no botão abaixo. Caso você seja um aluno, peça
            ajuda de um responsável.
          </Text>

          <Button
            my="1rem"
            colorScheme="blue"
            variant="outline"
            textTransform="uppercase"
            borderWidth="2px"
            w="100%"
            h="48px"
            onClick={() => history.push('/politica-de-privacidade')}
          >
            política de privacidade
          </Button>

          <Checkbox
            size="lg"
            my="1rem"
            className="checkbox-politica-de-privacidade"
            borderRadius="1px"
            borderColor="gray.500"
            autoFocus
            isChecked={accept}
            onChange={() => setAccept(!accept)}
          >
            <Text fontSize="0.9375rem">
              Li e aceito os termos do Aviso de Privacidade e Política de
              Privacidade
            </Text>
          </Checkbox>

          <Button
            my="1rem"
            colorScheme="blue"
            w="100%"
            h="48px"
            type="button"
            variant={accept ? 'solid' : 'outline'}
            isLoading={loading}
            onClick={() => {
              if (accept) {
                handleAcceptTerms()
              }
              onClose()
            }}
          >
            {!accept ? 'CANCELAR' : 'CONTINUAR'}
          </Button>
        </Box>
      </Modal>
      <GlobalStyles />
    </>
  )
}

export default ModalAcceptTerms
