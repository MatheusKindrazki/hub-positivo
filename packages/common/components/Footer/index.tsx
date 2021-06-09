import React, { useMemo } from 'react'

import { useMediaQuery } from '@psdhub/common/layout'

import LogoVersion from './components/LogoVersion'
import Column, { ColumnProps } from './components/FooterColumn'
import SimpleGrid from '../SimpleGrid'
import Divider from '../Divider'
import Box from '../Box'

export const FooterData = [
  {
    title: 'suporte',
    items: [
      { name: 'FAQ', href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU' },
      { name: 'Telefone: 0800 591 1510' },
      { name: 'email: atendimento@spe.com.br' }
    ]
  },
  {
    title: 'Jurídico',
    items: [
      {
        name: 'Copyright',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      },
      {
        name: 'Termos de uso',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      },
      {
        name: 'Política de privacidade',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      }
    ]
  },
  {
    title: 'Redes Sociais',
    items: [
      {
        name: 'Instagram',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      },
      {
        name: 'Facebook',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      }
    ]
  },
  {
    title: 'Redes Sociais',
    items: [
      {
        name: 'Instagram',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      },
      {
        name: 'Facebook',
        href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU'
      },
      { name: 'Youtube', href: 'https://www.youtube.com/watch?v=g-RNLG9E4FU' }
    ]
  }
]

interface FooterProps {
  columns: ColumnProps[]
}

const Footer: React.FC<FooterProps> = ({ columns }) => {
  const [isDesktop] = useMediaQuery('(min-width: 96em)')

  const responsiveGridColumns = useMemo(() => {
    return columns.length === 4 ? [1, 2, 4] : [1, 2, columns.length]
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
            columns.map(column => (
              <Column
                key={column.title}
                title={column.title}
                items={column.items}
              />
            ))
          ) : (
            <SimpleGrid columns={responsiveGridColumns}>
              {columns.map(column => (
                <Column
                  key={column.title}
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
