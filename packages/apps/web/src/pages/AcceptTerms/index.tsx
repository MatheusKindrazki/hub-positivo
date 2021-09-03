import React from 'react'

// import { Button } from '@psdhub/common/components/Form'
import { Box, Text, Heading } from '@psdhub/common/components'

const AcceptTerms: React.FC = () => {
  return (
    <Box p="6">
      <Heading color="black" fontSize="xl" mb="2">
        Atualização da Política de Privacidade
      </Heading>
      <Text fontSize="md" color="gray.500" mb="4">
        Atualizamos nossa política de privacidade. É preciso que você aceite os
        termos para continuar. Você poderá ver a nova política de privacidade
        clicando no botão abaixo.
      </Text>
    </Box>
  )
}

export default AcceptTerms
