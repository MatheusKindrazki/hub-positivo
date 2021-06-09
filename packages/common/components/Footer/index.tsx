import React from 'react'

import { useMediaQuery } from '@psdhub/common/layout'

import LogoVersion from './components/LogoVersion'
import Column, { ColumnProps } from './components/FooterColumn'
import SimpleGrid from '../SimpleGrid'

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
  const [isDesktop] = useMediaQuery('(min-width: 1280px)')

  return (
    <SimpleGrid
      columns={[1, 1, 1, 1, 6]}
      bg="white"
      px={['4', '4', '4', '5%']}
      py="1rem"
      boxShadow="base"
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
        <SimpleGrid columns={[1, 2, 3, 5]}>
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
  )
}

export default Footer
