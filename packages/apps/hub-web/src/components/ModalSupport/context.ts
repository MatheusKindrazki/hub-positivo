import { createContext } from 'react'

export interface ModalSupportProps {
  onClose: () => void
  onOpen: () => void
}

const ModalSupportContext = createContext({} as ModalSupportProps)

export default ModalSupportContext
