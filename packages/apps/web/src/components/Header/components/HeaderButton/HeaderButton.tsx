import React from 'react'

import { Button } from '@psdhub/common/components'

import { BoxProps } from '@chakra-ui/layout'

interface HeaderButtonProps extends BoxProps {
  onClick: () => void
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  onClick,
  as
}) => {
  return (
    <Button
      data-testid="header-button"
      h="7"
      variant="ghost"
      p="0"
      m="0"
      mr="2"
      onClick={onClick}
      color="blue.500"
      alignSelf="center"
      as={as}
    >
      {children}
    </Button>
  )
}

export default HeaderButton
