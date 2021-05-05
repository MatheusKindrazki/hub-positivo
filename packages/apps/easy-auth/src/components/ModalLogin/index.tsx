import React from 'react'

import Modal from '@psdhub/common/components/Modal'

const ModalLogin: React.FC = () => {
  return (
    <Modal title="Realizar login" isOpen onClose={() => console.log('brasil')}>
      brasil de mais
    </Modal>
  )
}

export default ModalLogin
