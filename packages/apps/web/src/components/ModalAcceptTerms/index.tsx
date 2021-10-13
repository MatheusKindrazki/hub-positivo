import React, { useEffect, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Text, Checkbox } from '@psdhub/common/components'

import GlobalStyles from './styles'

const ModalAcceptTerms: React.FC = () => {
  const dispatch = useDispatch()

  const { accepted, checking } = useSelector(
    (state: Store.State) => state.acceptTerms
  )

  const { isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    if (!accepted && !checking) {
      onOpen()
    }
  }, [accepted, onOpen, checking])

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  const handleSignOut = useCallback(() => {
    dispatch(signOut())
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
        onClose={() => console.log('')}
      >
        <Box
          d="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDir="column"
        >
          <Text my="1rem" fontSize="0.9375rem" lineHeight="20px">
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
          >
            política de privacidade
          </Button>

          <Checkbox size="lg" my="1rem" defaultChecked>
            <Text fontSize="0.9375rem">
              Tenho mais de 18 anos, li e aceito os termos do Aviso de
              Privacidade e Política de Privacidade
            </Text>
          </Checkbox>

          <Button
            my="1rem"
            colorScheme="blue"
            w="100%"
            h="48px"
            onClick={handleSignOut}
          >
            CONCLUIR
          </Button>
        </Box>
      </Modal>
      <GlobalStyles />
    </>
  )
}

export default ModalAcceptTerms
