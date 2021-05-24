import React, { useContext } from 'react'

import { useHistory } from 'react-router'

import { Button, Box } from '@psdhub/common/components'

import ModalContext from '~/components/ModalAddCategory/context'

const styles = {
  variant: 'unstyled',
  m: '1',
  color: 'blue.500',
  borderColor: 'blue.500',
  borderWidth: 'thin',
  minW: '11.25rem',
  p: '3',
  size: 'lg',
  fontSize: 'sm',
  fontWeigth: '500',
  borderRadius: '0.5rem'
}
const OptionButton: React.FC = () => {
  const { onOpen } = useContext(ModalContext)

  const { push } = useHistory()
  return (
    <Box>
      <Button textTransform="uppercase" {...styles} onClick={onOpen}>
        Adicionar Categoria
      </Button>
      <Button
        textTransform="uppercase"
        {...styles}
        onClick={() => push('/controle-de-acessos/criar')}
      >
        Adicionar Solução
      </Button>
    </Box>
  )
}

export default OptionButton
