import React, { useContext } from 'react'

import { useHistory } from 'react-router'

import { Button, Box } from '@psdhub/common/components'

import ModalContext from '~/components/ModalAddCategory/context'

const styles = {
  variant: 'unstyled',
  m: '1',
  color: 'blue.500',
  borderRadius: 'sm',
  borderColor: 'blue.500',
  borderWidth: 'thin',
  minW: '11.25rem'
}
const OptionButton: React.FC = () => {
  const { onOpen } = useContext(ModalContext)

  const { push } = useHistory()
  return (
    <Box>
      <Button
        {...styles}
        p="3"
        size="lg"
        fontSize="sm"
        fontWeight="500"
        textTransform="uppercase"
        borderRadius="8px"
        onClick={onOpen}
      >
        Adicionar Categoria
      </Button>
      <Button
        {...styles}
        p="3"
        size="lg"
        fontSize="sm"
        fontWeight="500"
        textTransform="uppercase"
        borderRadius="8px"
        onClick={() => push('/controle-de-acessos/criar')}
      >
        Adicionar Solução
      </Button>
    </Box>
  )
}

export default OptionButton
