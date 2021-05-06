import { createContext } from 'react'

export interface ModalProps {
  onClose: () => void
  onOpen: () => void
}

const ModalContext = createContext({} as ModalProps)

export default ModalContext
