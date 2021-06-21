import React from 'react'

import { TextProps } from '@psdhub/common/components/Text'
import { CaretLeft, CaretRight } from '@psdhub/common/components/Icons'
import { Box, Button, ButtonGroup, Text } from '@psdhub/common/components'

interface NavColumnsProps extends TextProps {
  handlePrev(): void
  handleNext(): void
}

const NavColumns: React.FC<NavColumnsProps> = ({
  children,
  handleNext,
  handlePrev,
  ...props
}) => {
  return (
    <Box
      d="inline-flex"
      justifyContent="center"
      alignItems="center"
      className="hub-nav-columns"
      {...props}
    >
      <Box mr="4">
        <Text>{children}</Text>
      </Box>
      <Box>
        <ButtonGroup isAttached bg="white" variant="outline" borderRadius="8px">
          <Button onClick={handlePrev} bg="transparent" borderColor="gray.400">
            <Box as={CaretLeft} color="blue.500" size={16} />
          </Button>
          <Button
            onClick={handleNext}
            bg="transparent"
            borderColor="gray.400"
            borderLeft="none"
          >
            <Box as={CaretRight} color="blue.500" size={16} />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default NavColumns
