import React, { useCallback, useContext, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { openTour } from '~/store/modules/tour/actions'
import { signOut } from '~/store/modules/auth/actions'

import { useDisclosure } from '@hub/common/hooks'
import Welcome from '@hub/common/components/Welcome'
import Select from '@hub/common/components/Select'
import Popover, {
  PopoverTrigger,
  PopoverContent
} from '@hub/common/components/Popover'
import { MenuDivider } from '@hub/common/components/Menu'
import { Box, Button, Avatar } from '@hub/common/components'

import history from '~/services/history'

import ModalSupportContext from '~/components/ModalSupport/context'

import GlobalStyle from '../../styles'
import { useHeader } from '../../context'
interface ModalProps {
  openModalPass: () => void
}

const DesktopMenu: React.FC<ModalProps> = ({ openModalPass }) => {
  const dispatch = useDispatch()
  const { onOpen } = useContext(ModalSupportContext)

  const [enableBlur, setEnableBlur] = useState(true)

  const { schoolList, roleList, ...func } = useHeader()
  const { steps } = useSelector((state: Store.State) => state.tour)

  const { user } = useSelector((state: Store.State) => state.user)
  const { guid } = useSelector((state: Store.State) => state.profile)

  const handleSignOut = useCallback(async () => {
    dispatch(signOut())
    setTimeout(() => history.push('/login'), 500)
  }, [dispatch])

  const handleOpenTour = useCallback(() => {
    dispatch(openTour(true))
  }, [dispatch])

  const { setRole, setSchool, resetInfo, defaultValue } = func

  const { isOpen, onOpen: menuOpen, onClose: menuClose } = useDisclosure()

  const handleClosed = useCallback(() => {
    menuClose()
    resetInfo()
  }, [menuClose, resetInfo])

  return (
    <Box
      className="hub-logo"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button
        disabled={!steps?.length}
        fontSize="0.875rem"
        backgroundColor="white"
        fontWeight="bold"
        color="blue.500"
        onClick={handleOpenTour}
        mx="1"
      >
        Fazer tour
      </Button>
      <Button
        id="header-suporte"
        fontSize="0.875rem"
        backgroundColor="white"
        fontWeight="bold"
        color="blue.500"
        onClick={onOpen}
        mx="1"
      >
        Estou com uma dúvida
      </Button>
      <Popover
        data-testid="popover"
        onClose={handleClosed}
        onOpen={menuOpen}
        isOpen={isOpen}
        closeOnBlur={enableBlur}
        isLazy
      >
        <PopoverTrigger>
          <Avatar
            data-testid="popover-trigger"
            cursor="pointer"
            width="2.6rem"
            color="#3C3C3C"
            height="2.5rem"
            backgroundColor="gray.400"
            name={user?.name || ''}
            src=""
          />
        </PopoverTrigger>
        <PopoverContent
          data-testid="popover-content"
          outline="none"
          minW="310px"
          borderRadius="md"
          boxShadow="dark-lg"
          border="1px solid #D9D9D9"
          mr="2rem!important"
          top="50px!important"
          _focus={{
            boxShadow: 'dark-lg'
          }}
        >
          <Box px="4" py="2" w="100%" h="auto">
            <Welcome
              name={user?.name || ''}
              avatar=""
              option="name"
              fontSize="1rem"
              size="48px"
              fontWeight="bold"
            />
          </Box>
          <MenuDivider />
          <Box px="4" pt="3" pb="3">
            <Select
              variant="normal"
              blurInputOnSelect
              placeholder="Selecione"
              isSearchable
              className="height-md"
              value={defaultValue.school}
              options={schoolList}
              onFocus={() => setEnableBlur(false)}
              onBlur={() => setEnableBlur(true)}
              onChange={e => {
                setSchool(e as any)
              }}
            />
          </Box>
          <Box px="4" pb="3">
            <Select
              key={String(defaultValue.role)}
              variant="normal"
              placeholder="Selecione"
              className="height-md"
              value={defaultValue.role}
              options={roleList}
              onFocus={() => setEnableBlur(false)}
              onBlur={() => setEnableBlur(true)}
              onChange={e => {
                setEnableBlur(true)
                setRole(e as any)
              }}
            />
          </Box>
          <MenuDivider />
          {guid === 'PROFESSOR' && (
            <Box px="5" py="3" pt="5">
              <Button
                onClick={() => history.push('/minhas-turmas')}
                variant="link"
                color="gray.500"
                fontSize="0.875rem"
              >
                Minhas turmas
              </Button>
            </Box>
          )}
          <Box px="5" py="3" pt={guid === 'PROFESSOR' ? '0' : '3'}>
            <Button
              onClick={openModalPass}
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
            >
              Alterar minha senha
            </Button>
          </Box>
          <Box px="3" py="3" pt="0">
            <Button
              variant="link"
              color="gray.500"
              fontSize="0.875rem"
              onClick={handleSignOut}
            >
              Sair
            </Button>
          </Box>
        </PopoverContent>
      </Popover>
      <GlobalStyle />
    </Box>
  )
}

export default DesktopMenu
