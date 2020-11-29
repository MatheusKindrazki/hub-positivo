import React, { useEffect } from 'react'

import {
  Collapse as CollapseUI,
  Box,
  Heading,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'
import { CaretDown } from 'phosphor-react'

import CollapseGlobal from './styles'

interface CollapseProps {
  id: string
  nome: string
  cor: string
  gridColumns?: number | number[]
}

const Collapse: React.FC<CollapseProps> = ({
  id,
  nome,
  children,
  gridColumns
}) => {
  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    if (isOpen) return

    onToggle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box mt="8" key={id} width="100%" className="collapse-home">
        <Box
          width="100%"
          style={{ cursor: 'pointer' }}
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={onToggle}
        >
          <Heading
            as="h6"
            color="blue.500"
            fontWeight="normal"
            fontSize="1.5rem"
            className="background-animate"
          >
            {nome}
          </Heading>

          <Box
            as={CaretDown}
            color="blue.500"
            size="1.25rem"
            style={{
              transition: 'all .2s linear',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
            }}
          />
        </Box>
        <CollapseUI in={isOpen} animateOpacity style={{ padding: '10px 5px' }}>
          <SimpleGrid
            columns={gridColumns || [1, 1, 2, 3, 4]}
            spacing={4}
            mt="4"
          >
            {children}
          </SimpleGrid>
        </CollapseUI>
      </Box>
      <CollapseGlobal />
    </>
  )
}

export default Collapse
