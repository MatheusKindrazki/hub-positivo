import React from 'react'

import { Box, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import classNames from 'classnames'
import { CaretDown } from 'phosphor-react'
import { Collapse as CollapseUI } from 'react-collapse'

import CollapseGlobal from './styles'

interface CollapseProps {
  id: string
  nome: string
  cor: string
  gridColumns?: number | number[]
  className?: string
}

const Collapse: React.FC<CollapseProps> = ({
  id,
  nome,
  children,
  gridColumns,
  className
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Box
        mt="8"
        key={id}
        width="100%"
        className={classNames(className, { 'collapse-home': true })}
      >
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
        <CollapseUI isOpened={isOpen} style={{ padding: '10px 0' }}>
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
