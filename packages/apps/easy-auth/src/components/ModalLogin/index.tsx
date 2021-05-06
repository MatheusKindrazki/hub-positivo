import React from 'react'

import Modal from '@psdhub/common/components/Modal'

import SignIn from '../SignIn'
import { useAuth } from '../../context/authContext'

const steps = [SignIn]

const ModalLogin: React.FC = () => {
  const { signed } = useAuth()

  return (
    <Modal title="Realizar login" isOpen={!signed} onClose={() => {}}>
      {React.createElement(steps[0])}
    </Modal>
  )
}

export default ModalLogin
