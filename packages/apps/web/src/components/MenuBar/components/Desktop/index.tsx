import React from 'react'

import { useSelector } from 'react-redux'

import Drawer, {
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  useDisclosure
} from '@psdhub/common/components/Drawer'
import { Text, Select, Stack } from '@psdhub/common/components'

import { HeaderProvider } from '~/components/Header/context'

import { CollapseContainer } from './styles'

import { MenuHeader, SelectProfile } from '..'

const MenuBar: React.FC = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const { info: user } = useSelector((state: Store.State) => state.user)

  return (
    <HeaderProvider>
      <Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
        <DrawerContent borderBottomWidth="1px">
          <MenuHeader
            name={user?.name || 'usuário (a)'}
            closeButton
            onClose={onClose}
          />
          <DrawerBody pb="0" overflow="visible" borderBottomWidth="1px">
            <SelectProfile />
          </DrawerBody>
          <DrawerBody
            py="0"
            alignItems="center"
            d="flex"
            borderBottomWidth="1px"
          >
            <Select
              css={{ width: '100%' }}
              variant="secondary"
              placeholder="Buscar solução"
            />
          </DrawerBody>
          <DrawerBody pt="0" borderBottomWidth="1px">
            <CollapseContainer
              title="Favoritos"
              id=""
              cor="blue.500"
              nome="Favoritos"
            >
              teste
            </CollapseContainer>
          </DrawerBody>
          <DrawerFooter placeContent="start">
            <Stack spacing="4">
              <Text variant="ghost" textAlign="left">
                Atualização da versão
              </Text>
              <Text variant="ghost" textAlign="left">
                Alterar minha senha
              </Text>
              <Text variant="ghost" textAlign="left" color="blue.500">
                Sair
              </Text>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HeaderProvider>
  )
}

export default MenuBar
