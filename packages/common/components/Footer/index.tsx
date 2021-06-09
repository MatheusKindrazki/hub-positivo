import React from 'react'

import { Divider } from '..'

import { ColumnsContainer, FooterContainer } from './styles'
import FooterLogo from './components/FooterLogo'
import Column, { ColumnProps } from './components/FooterColumn'

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
  return (
    <FooterContainer length={columns.length}>
      <Divider mb="3" w="100%" />

      <FooterLogo columnsLength={columns.length} />
      <ColumnsContainer length={columns.length}>
        {columns.map(column => (
          <Column
            key={column.title}
            title={column.title}
            items={column.items}
          />
        ))}
      </ColumnsContainer>
    </FooterContainer>
  )
}

export default Footer
