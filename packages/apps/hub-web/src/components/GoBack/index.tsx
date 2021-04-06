import React from 'react'

import { ArrowLeft } from '@psdhub/common/components/Icons'
import { Box, Heading, Button } from '@psdhub/common/components'

import { ButtonProps } from '@chakra-ui/react'

const GoBack: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    <Box d="flex" justifyContent="flex-start">
      <Button
        data-testid="go-back"
        variant="link"
        justifyContent="flex-start"
        onClick={onClick}
        {...rest}
      >
        <Box as={ArrowLeft} size={24} />
      </Button>
      <Heading color="black" fontSize="xl">
        {children}
      </Heading>
    </Box>
  )
}

export default GoBack
