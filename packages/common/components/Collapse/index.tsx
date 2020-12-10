import React, { useMemo } from 'react'

import {
  Box,
  Heading,
  SimpleGrid,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react'
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
  grid?: boolean
}

const Collapse: React.FC<CollapseProps> = ({
  id,
  nome,
  children,
  gridColumns,
  grid = true,
  className
}) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const [isLargerThan1280] = useMediaQuery('(min-width: 1300px)')

  const responsiveGrid = useMemo(() => {
    return isLargerThan1280 ? 4 : 3
  }, [isLargerThan1280])

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
          {grid ? (
            <SimpleGrid
              columns={gridColumns || [1, 1, 2, responsiveGrid]}
              spacing={4}
              mt="4"
            >
              {children}
            </SimpleGrid>
          ) : (
            <>{children}</>
          )}
        </CollapseUI>
      </Box>
      <CollapseGlobal />
    </>
  )
}

export default Collapse
