import React from 'react'

import { useDisclosure } from '@psdhub/common/hooks'
import { X } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import { SlideFade } from '@chakra-ui/react'

import { DeleteButton } from '../styles'

interface AnimatedFadeProps {
  onDelete: () => void
}

const AnimatedFade: React.FC<AnimatedFadeProps> = ({ children, onDelete }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  return (
    <SlideFade offsetY="-40px" in={isOpen}>
      <Box display="flex" justifyContent="space-between">
        {children}
        <DeleteButton
          justifySelf="flex-end"
          size="20px"
          as={X}
          onClick={() => {
            onToggle()
            setTimeout(() => onDelete(), 150)
          }}
        />
      </Box>
    </SlideFade>
  )
}

export default AnimatedFade
