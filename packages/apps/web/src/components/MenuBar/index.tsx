import React, { useRef } from 'react'

import { useDisclosure, useMediaQuery } from '@psdhub/common/hooks'
import { Modal } from '@psdhub/common/components'

import ModalVersionUpdate, {
  ModalHandler
} from '~/components/ModalVersionUpdate'
import { HeaderProvider } from '~/components/Header/context'
import { RefMenuProps } from '~/components/Header/components/Mobile'
import AlterPass from '~/components/Header/components/AlterPass'

import { DesktopMenu } from './components'

const MenuBar: React.FC = () => {
  const menuRef = useRef<RefMenuProps>(null)
  const modalUpdateVersionRef = useRef<ModalHandler>({ onOpen: () => null })

  const { onOpen: onOpenModalAlterPass, onClose, isOpen } = useDisclosure()

  const [isDesktop] = useMediaQuery('(min-width: 480px)')

  return (
    <HeaderProvider>
      <Modal
        title="Alterar senha"
        isOpen={isOpen}
        maxW={isDesktop ? '26rem' : '20rem'}
        isCentered
        autoFocus
        onClose={onClose}
      >
        <AlterPass onClose={onClose} />
      </Modal>
      <ModalVersionUpdate ref={modalUpdateVersionRef} />
      <DesktopMenu
        openModalPass={() => {
          onOpenModalAlterPass()
        }}
        openModalVersionUpdate={() => modalUpdateVersionRef.current.onOpen()}
        ref={menuRef}
      />
    </HeaderProvider>
  )
}

export default MenuBar
