import React from 'react'

import LogoVersion from './components/FooterLogo'
import Column, { ColumnProps } from './components/FooterColumn'
import SimpleGrid from '../SimpleGrid'
import Divider from '../Divider'
import Box from '../Box'

interface FooterProps {
  columns: ColumnProps[]
}

const Footer: React.FC<FooterProps> = ({ columns }) => {
  return (
    <Box mt="1rem" py="5" px="4">
      <Divider h="0.5" bg="gray.100" />
      <Box width="100%" bg="white" py="1rem">
        <LogoVersion />
        <SimpleGrid
          px="4"
          columns={[1, 2, 2, columns.length <= 3 ? columns.length : 4]}
          maxW="1400px"
          m="auto"
        >
          {columns.map((column, i) => (
            <Column
              ativo={column.ativo}
              key={column.title + i}
              title={column.title}
              items={column.items}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Footer
