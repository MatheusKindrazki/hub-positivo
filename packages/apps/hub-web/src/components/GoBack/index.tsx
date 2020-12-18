import React from 'react'
import { MouseEventHandler } from 'react'

import { Box, Heading, Button } from '@hub/common/components'
import { ArrowLeft } from '@hub/common/components/Icons'

type GobackProps = {
  children: string
  colorScheme: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const GoBack: React.FC<GobackProps> = ({ onClick, colorScheme, children }) => {
  return (
    <Box d="flex" justifyContent="flex-start" mb="4">
      <Button
        colorScheme={colorScheme}
        variant="link"
        justifyContent="flex-start"
        onClick={onClick}
      >
        <Box as={ArrowLeft} color={`${colorScheme}.500`} size={24} />
      </Button>
      <Heading color="black" fontSize="xl">
        {children}
      </Heading>
    </Box>
  )
}

export default GoBack
