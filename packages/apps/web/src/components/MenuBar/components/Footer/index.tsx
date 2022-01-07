import React from 'react'

import { useSelector } from 'react-redux'

import Text, { TextProps } from '@psdhub/common/components/Text'
import { DrawerFooter } from '@psdhub/common/components/Drawer'
import { Stack } from '@psdhub/common/components'
export interface FooterProps extends TextProps {
  handleSignOut: () => void | undefined
  openModalPass: () => void
  openModalVersionUpdate?: () => void
  redirectToMyClasses: () => void
}

const Footer: React.FC<FooterProps> = ({
  handleSignOut,
  openModalPass,
  redirectToMyClasses,
  ...props
}) => {
  const styles: Partial<TextProps> = {
    cursor: 'pointer',
    variant: 'ghost',
    textAlign: 'left'
  }

  const { guid: profile } = useSelector((state: Store.State) => state.profile)
  return (
    <>
      <DrawerFooter px="1rem" placeContent="start" mb="1rem" {...props}>
        <Stack spacing="4">
          {profile === 'PROFESSOR' && (
            <Text onClick={redirectToMyClasses} {...styles}>
              Minhas turmas
            </Text>
          )}
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
