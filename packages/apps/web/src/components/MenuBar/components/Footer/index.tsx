import React from 'react'

import Text from '@psdhub/common/components/Text'
import { DrawerFooter } from '@psdhub/common/components/Drawer'
import { BoxProps } from '@psdhub/common/components/Box'
import { Stack } from '@psdhub/common/components'

const Footer: React.FC<BoxProps> = props => {
  return (
    <>
      <DrawerFooter placeContent="start" p="1rem" {...props}>
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
    </>
  )
}

export default Footer
