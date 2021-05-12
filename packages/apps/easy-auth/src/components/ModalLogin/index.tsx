import React from 'react'

import Modal from '@psdhub/common/components/Modal'
import Box from '@psdhub/common/components/Box'

import SignIn from '../SignIn'
import Profile from '../Profile'
import { useAuth } from '../../context/authContext'

const steps = [SignIn, Profile]

const ModalLogin: React.FC = () => {
  const { signed, step } = useAuth()

  return (
    <Modal title="Realizar login" isOpen={!signed} onClose={() => {}}>
      <Box>{React.createElement(steps[step])}</Box>
    </Modal>
  )
}

export default ModalLogin
