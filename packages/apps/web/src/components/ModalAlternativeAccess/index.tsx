import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { noBreakAccessDisable } from '~/store/modules/noBreakAccess/actions'
import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import Modal from '@psdhub/common/components/Modal'
import { Box, Button, Text, Link } from '@psdhub/common/components'

import { noBreak, EventData } from '~/services/mixpanel/noBreak'

import GlobalStyles from './styles'
import salas from './salas.svg'
import LinkButton from './components/LinkButton'
import avaliacao from './avaliacao.svg'

const ModalAlternativeAccess: React.FC = () => {
  const dispatch = useDispatch()

  const { isOpen } = useDisclosure({ defaultIsOpen: true })

  const { user_login = '' } = useSelector(
    (state: Store.State) => state.noBreakAccess
  )

  const [isDesktop] = useMediaQuery('(min-width: 768px)')

  const handleSignOut = useCallback(() => {
    dispatch(noBreakAccessDisable({ user_login }))
    dispatch(signOut())
  }, [dispatch, user_login])

  const handleRedirect = useCallback(
    (url: string, type: EventData['type']) => {
      noBreak({
        type,
        user_login
      })

      window.open(url, '_blank')
    },
    [user_login]
  )

  return (
    <>
      <Modal
        title="Ops, estamos com problemas"
        isCentered
        autoFocus
        className="modal-acesso-alternativo"
        maxW={isDesktop ? '50rem' : '25rem'}
        isOpen={isOpen}
        onClose={() => {
          console.log('')
        }}
      >
        <Box
          mt="-2"
          d="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDir="column"
        >
          <Text fontSize="0.9375rem" lineHeight="20px">
            Nosso time está focado para que o On volte ao normal o quanto antes,
            mas enquanto isso siga o passo-a-passo para acessar nossas soluções:
          </Text>

          <Box mt="6">
            <LinkButton title="Salas Virtuais" image={salas}>
              Acesse{' '}
              <Link
                onClick={() =>
                  handleRedirect(
                    'https://meet.google.com',
                    'No Break Meet Accessed'
                  )
                }
                color="blue.500"
                fontWeight="600"
              >
                https://meet.google.com
              </Link>{' '}
              e visualize suas salas. Caso sua conta não esteja conectada, entre
              em contato com sua escola para recuperar seu e-mail de acesso às
              salas.
            </LinkButton>

            <LinkButton title="Avaliações" image={avaliacao}>
              Acesse{' '}
              <Link
                onClick={() =>
                  handleRedirect(
                    'https://plus-app.studos.com.br',
                    'No Break Studos Accessed'
                  )
                }
                color="blue.500"
                fontWeight="600"
              >
                https://plus-app.studos.com.br
              </Link>{' '}
              e consulte sua escola para receber seu e-mail e senha exclusivos
              para acesso as provas e atividades.
            </LinkButton>
          </Box>

          <Button
            my="1rem"
            colorScheme="blue"
            w="100%"
            h="48px"
            onClick={handleSignOut}
          >
            FECHAR
          </Button>
        </Box>
      </Modal>
      <GlobalStyles />
    </>
  )
}

export default ModalAlternativeAccess
