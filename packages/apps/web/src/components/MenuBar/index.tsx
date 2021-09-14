import React from 'react'

import Drawer, {
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerBody
} from '@psdhub/common/components/Drawer'
import { Box, Text, Divider, Select, Stack } from '@psdhub/common/components'

import { CollapseContainer } from './styles'

const MenuBar: React.FC = () => {
  const onClose = () => null
  return (
    <Drawer isOpen={true} onClose={onClose} placement={'left'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>{'<Nome do usuario>'}</Text>
        </DrawerHeader>
        <Divider />

        <DrawerBody pb="0">
          <Box mb="1rem">
            <Select variant="normal" css={{ marginBottom: '1rem' }} />
            <Select variant="normal" css={{ marginBottom: '1rem' }} />
          </Box>
          <Select variant="secondary" placeholder="Buscar solução" />
        </DrawerBody>
        <Divider />
        <DrawerBody pt="0">
          <CollapseContainer
            title="Favoritos"
            id=""
            cor="blue.500"
            nome="Favoritos"
          >
            teste
          </CollapseContainer>
          <CollapseContainer
            title="Avaliação"
            id=""
            cor="blue.500"
            nome="Avaliação"
          >
            teste
          </CollapseContainer>
          <CollapseContainer
            title="Recursos"
            id=""
            cor="blue.500"
            nome="Recursos"
          >
            teste
          </CollapseContainer>
          <CollapseContainer
            title="Conteúdo"
            id=""
            cor="blue.500"
            nome="Conteúdo"
          >
            teste
          </CollapseContainer>
        </DrawerBody>
        <Divider />
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
  )
}

export default MenuBar
