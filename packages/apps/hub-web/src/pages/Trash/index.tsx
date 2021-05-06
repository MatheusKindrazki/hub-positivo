import React from 'react'

import Table, { Columns } from '@psdhub/common/components/Table'
import { Box, Button } from '@psdhub/common/components'

import Header from '~/components/AccessControlHeader'

import Container from './styles'
import DeleteSolutionButton from './components/DeleteSolutionButton'

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
    render: () => <DeleteSolutionButton />
  },
  {
    property: 'restaure',
    header: null,
    render: () => (
      <Button variant="unstyled" color="blue.500">
        RESTAURAR
      </Button>
    )
  }
]

const mock = [
  {
    solution: 'Salas virtuais',
    description: 'Acesse e visualize as salas virtuais',
    category: 'Recursos',
    openOn: 'Mesma janela'
  },
  {
    solution: 'Plano semanal',
    description: 'Organize e distribua suas aulas',
    category: 'Recursos',
    openOn: 'Outra janela'
  },
  {
    solution: 'Livro digital',
    description: 'Material didático em PDF e Digital interativo',
    category: 'Conteúdo',
    openOn: 'Mesma janela'
  }
]
const Trash: React.FC = () => {
  return (
    <Container m="1" marginTop="10">
      <Header />
      <Box overflow="auto" bg="white" rounded="md" m="5">
        <Table
          columns={columns}
          data={mock}
          className="trash-table"
          size="sm"
        />
      </Box>
    </Container>
  )
}

export default Trash
