import React from 'react'

import { Box, Heading, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'

import { ButtonProps } from '@chakra-ui/react'

const GoBack: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    <Box d="flex" justifyContent="flex-start">
      <Button
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
