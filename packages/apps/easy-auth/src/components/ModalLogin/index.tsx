import React from 'react'

import Modal from '@psdhub/common/components/Modal'

import { useAuth } from '../../context/authContext'

const ModalLogin: React.FC = () => {
  const { signed } = useAuth()

  return (
    <Modal title="Realizar login" isOpen={!signed} onClose={() => {}}>
      brasil de mais
    </Modal>
  )
}

export default ModalLogin
