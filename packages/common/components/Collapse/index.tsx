import React, { useMemo } from 'react'

import {
  Collapse as CollapseUI,
  CollapseProps as CollapseUIProps
} from 'react-collapse'
import { CaretDown } from 'phosphor-react'
import classNames from 'classnames'

import {
  Box,
  Heading,
  SimpleGrid,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react'

import CollapseGlobal from './styles'

export interface CollapseProps extends Omit<CollapseUIProps, 'isOpened'> {
  id: string
  nome: string
  disable?: boolean
  cor: string
  gridColumns?: number | number[]
  className?: string
  grid?: boolean
}

const Collapse: React.FC<CollapseProps> = ({
  id,
  nome,
  children,
  disable,
  gridColumns,
  grid = true,
  className,
  cor,
  ...rest
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
        className={classNames(className, { collapse: true })}
      >
        <Box
          width="100%"
          style={!disable ? { cursor: 'pointer' } : {}}
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          onClick={onToggle}
          className="collapse-header"
        >
          <Heading as="h6" color={cor} fontWeight="normal" fontSize="1.5rem">
            {nome}
          </Heading>
          {!disable && (
            <Box
              data-testid="collapse-box"
              as={CaretDown}
              color={cor}
              size="1.25rem"
              style={{
                transition: 'all .2s linear',
                transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
              }}
            />
          )}
        </Box>
        <CollapseUI
          {...rest}
          isOpened={disable ? true : isOpen}
          style={{ padding: '10px 0' }}
        >
          {grid ? (
            <SimpleGrid
              data-testid="simple-grid"
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
