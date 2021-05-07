import React from 'react'

import Modal from '@psdhub/common/components/Modal'

import SignIn from '../SignIn'
import { useAuth } from '../../context/authContext'

const ModalLogin: React.FC = () => {
  const { signed } = useAuth()

  return (
    <Modal title="Realizar login" isOpen={!signed} onClose={() => {}}>
      <SignIn />
    </Modal>
  )
}

export default ModalLogin
