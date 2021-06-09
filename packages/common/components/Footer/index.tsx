import React, { useMemo } from 'react'

import { useMediaQuery } from '@psdhub/common/layout'

import LogoVersion from './components/FooterLogo'
import Column, { ColumnProps } from './components/FooterColumn'
import SimpleGrid from '../SimpleGrid'
import Divider from '../Divider'
import Box from '../Box'

interface FooterProps {
  columns: ColumnProps[]
}

const Footer: React.FC<FooterProps> = ({ columns }) => {
  const [isDesktop] = useMediaQuery('(min-width: 96em)')

  const responsiveGridColumns = useMemo(() => {
    return columns.length >= 4 ? [1, 2, 4] : [1, 2, columns.length]
  }, [columns])
  return (
    <>
      <Divider h="0.5" bg="gray.100" />
      <Box width="100%" bg="white">
        <SimpleGrid
          columns={[1, 1, 1, 1, 1, columns.length + 1]}
          py="1rem"
          w="90%"
          m="auto"
        >
          <LogoVersion />
          {isDesktop ? (
            columns.map((column, i) => (
              <Column
                key={column.title + i}
                title={column.title}
                items={column.items}
              />
            ))
          ) : (
            <SimpleGrid columns={responsiveGridColumns}>
              {columns.map((column, i) => (
                <Column
                  key={column.title + i}
                  title={column.title}
                  items={column.items}
                />
              ))}
            </SimpleGrid>
          )}
        </SimpleGrid>
      </Box>
    </>
  )
}

export default Footer
