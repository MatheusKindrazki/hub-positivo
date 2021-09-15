import React, { useRef } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import { Modal } from '@psdhub/common/components'

import { HeaderProvider } from '~/components/Header/context'
import { RefMenuProps } from '~/components/Header/components/Mobile'
import AlterPass from '~/components/Header/components/AlterPass'

import { DesktopMenu } from './components'

const MenuBar: React.FC = () => {
  const menuRef = useRef<RefMenuProps>(null)
  const { onOpen, onClose, isOpen } = useDisclosure()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  return (
    <HeaderProvider>
      <Modal
        title="Alterar senha"
        isOpen={isOpen}
        maxW={isDesktop ? '26rem' : '20rem'}
        onClose={onClose}
        isCentered
        autoFocus
      >
        <AlterPass onClose={onClose} />
      </Modal>
      <DesktopMenu
        openModalPass={() => {
          menuRef.current?.openMenu()
          onOpen()
        }}
        ref={menuRef}
      />
    </HeaderProvider>
  )
}

export default MenuBar
