import React from 'react'

import Container from './styles'
import LogoVersion from './components/FooterLogo'
import Column, { ColumnProps } from './components/FooterColumn'
import SimpleGrid from '../SimpleGrid'
import Box from '../Box'

interface FooterProps {
  columns: ColumnProps[]
}

const Footer: React.FC<FooterProps> = ({ columns }) => {
  return (
    <>
      <Container mt="1rem" width="100%" bg="white">
        <Box py="1rem">
          <LogoVersion />
          <SimpleGrid
            px="4"
            columns={[1, 2, 2, columns.length <= 3 ? columns.length : 4]}
            maxW="1400px"
            m="auto"
          >
            {columns.map((column, i) => (
              <Column
                active={column.active}
                key={column.title + i}
                title={column.title}
                items={column.items}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}

export default Footer
