import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { solutionsGetExcludedRequest } from '~/store/modules/solutions/actions'

import Table, { Columns } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components'

import Header from '~/components/AccessControlHeader'

import { formatReturnDataFromAPI } from './utils/formatReturnDataFromAPI'
import Container from './styles'
import RestaureSolutionButton from './components/RestaureSolutionButton'
import EmptyTrash from './components/EmptyTrash'
import DeleteSolutionButton from './components/DeleteSolutionButton'

type TableSolution = {
  solution: string
  description: string
  category: string
  openOn: string
  id: string
}
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
    render: (e: TableSolution) => <RestaureSolutionButton id={e.id} />
  }
]
const Trash: React.FC = () => {
  const dispatch = useDispatch()
  const { excludedSolutions: data } = useSelector(
    (state: Store.State) => state.solutions
  )

  useEffect(() => {
    if (!data) {
      dispatch(solutionsGetExcludedRequest())
    }
  }, [dispatch, data])

  return (
    <Container m="1" marginTop="10">
      <Header />
      <Box overflow="auto" bg="white" rounded="md" m="5">
        {data?.length ? (
          <Table
            columns={columns}
            data={formatReturnDataFromAPI(data)}
            className="trash-table"
            size="sm"
          />
        ) : (
          <EmptyTrash />
        )}
      </Box>
    </Container>
  )
}

export default Trash
