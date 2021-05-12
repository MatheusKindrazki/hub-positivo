import React from 'react'

import Modal from '@psdhub/common/components/Modal'
import Box from '@psdhub/common/components/Box'

import GlobalStyle from './styles'
import SignIn from '../SignIn'
import Profile from '../Profile'
import { useAuth } from '../../context/authContext'

const steps = [SignIn, Profile]

const titles = ['Login', 'Perfil']

const ModalLogin: React.FC = () => {
  const { signed, step } = useAuth()

  return (
    <>
      <Modal
        title={titles[step]}
        className="hub-auth-modal"
        isOpen={!signed}
        onClose={() => {}}
      >
        <Box>{React.createElement(steps[step])}</Box>
      </Modal>
      <GlobalStyle />
    </>
  )
}

export default ModalLogin
