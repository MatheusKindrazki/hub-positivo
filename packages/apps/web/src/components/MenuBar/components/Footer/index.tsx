import React from 'react'

import Text, { TextProps } from '@psdhub/common/components/Text'
import { DrawerFooter } from '@psdhub/common/components/Drawer'
import { Stack } from '@psdhub/common/components'

export interface FooterProps extends TextProps {
  handleSignOut: () => void
  openModalPass: () => void
}

const Footer: React.FC<FooterProps> = ({
  handleSignOut,
  openModalPass,
  ...props
}) => {
  const styles: Partial<TextProps> = {
    cursor: 'pointer',
    variant: 'ghost',
    textAlign: 'left'
  }
  return (
    <>
      <DrawerFooter placeContent="start" p="1rem" {...props}>
        <Stack spacing="4">
          <Text {...styles}>Atualização da versão</Text>
          <Text {...styles} onClick={openModalPass}>
            Alterar minha senha
          </Text>
          <Text {...styles} color="blue.500" onClick={handleSignOut}>
            Sair
          </Text>
        </Stack>
      </DrawerFooter>
    </>
  )
}

export default Footer
