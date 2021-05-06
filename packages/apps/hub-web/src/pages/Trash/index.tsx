import React from 'react'

import Table, { Columns } from '@psdhub/common/components/Table'

import Header from '~/components/AccessControlHeader'

import Container from './styles'

type TableSolution = any

export interface CollapseData {
  nome: string
  solutions: TableSolution[]
}

export const columns: Columns[] = [
  { property: 'solution', header: 'Solução' },
  { property: 'description', header: 'Descrição' },
  { property: 'category', header: 'Categoria' },
  { property: 'openOn', header: 'Abrir em...' },

  {
    property: 'delete',
    header: null,
    render: () => <span>EXCLUIR</span>
  },
  {
    property: 'restaure',
    header: null,
    render: () => <span>RESTAURAR</span>
  }
]

const mock = [
  {
    solution: 'TESTE',
    description: 'TESTE',
    category: 'TESTE',
    openOn: 'TESTE'
  }
]
const Trash: React.FC = () => {
  return (
    <Container m="1" marginTop="10">
      <Header />
      <Table columns={columns} data={mock} />
    </Container>
  )
}

export default Trash
