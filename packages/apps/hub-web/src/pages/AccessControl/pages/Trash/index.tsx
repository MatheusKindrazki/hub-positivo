import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Solution } from '~/store/modules/solutions/types'
import { solutionsGetRequest } from '~/store/modules/solutions/actions'

import Table, { Columns } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components'

import ModalDeleteSolution from '~/components/ModalDeleteSolution'

import Container from './styles'
import RestaureSolutionButton from './components/RestaureSolutionButton'
import EmptyTrash from './components/EmptyTrash'
import DeleteSolutionButton from './components/DeleteSolutionButton'
import { trashDataFormat } from '../../utils/trashTableDataFormat'
import Header from '../../components/Header'

export interface TableData extends Solution {
  categoria: string
  tipoRenderizacao: 'Nova janela' | 'Mesma janela'
}

export const columns: Columns[] = [
  { property: 'nome', header: 'Solução' },
  { property: 'descricao', header: 'Descrição' },
  { property: 'categoria', header: 'Categoria' },
  { property: 'tipoRenderizacao', header: 'Abrir em...' },

  {
    property: 'delete',
    header: null,
    render: () => <DeleteSolutionButton />
  },
  {
    property: 'restaure',
    header: null,
    render: (e: TableData) => <RestaureSolutionButton id={e.id} />
  }
]
const Trash: React.FC = () => {
  const dispatch = useDispatch()
  const { data, loading: load } = useSelector(
    (state: Store.State) => state.solutions
  )

  useEffect(() => {
    dispatch(solutionsGetRequest('EXCLUIDA'))
  }, [dispatch])

  return (
    <Container m="auto" maxW="90rem" p="10">
      <ModalDeleteSolution />
      <Header />
      <Box overflow="auto" bg="white" rounded="md" m="5">
        {!load &&
          (data?.length ? (
            <Table
              columns={columns}
              data={trashDataFormat(data)}
              className="trash-table"
              size="md"
            />
          ) : (
            <EmptyTrash />
          ))}
      </Box>
    </Container>
  )
}

export default Trash
