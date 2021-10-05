import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Solution } from '~/store/modules/solutions/types'
import { solutionGetExcludedRequest } from '~/store/modules/solutions/actions'

import Table, { Columns } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components'

import { trashDataFormat } from './utils/trashTableDataFormat'
import { Container } from './styles'
import RestoreSolutionButton from './components/RestoreSolutionButton'
import EmptyTrash from './components/EmptyTrash'
import Header from '../../components/Header'

export interface TableData extends Omit<Solution, 'category'> {
  categoria: string
  tipoRenderizacao: 'Nova janela' | 'Mesma janela'
}

export const columns: Columns[] = [
  { property: 'nome', header: 'Solução' },
  { property: 'descricao', header: 'Descrição' },
  { property: 'categoria', header: 'Categoria' },
  { property: 'tipoRenderizacao', header: 'Abrir em...' },
  {
    property: 'restore',
    header: null,
    render: (e: TableData) => <RestoreSolutionButton id={e.id} />
  }
]
const Trash: React.FC = () => {
  const dispatch = useDispatch()

  const { excluidas: data, loading: load } = useSelector(
    (state: Store.State) => state.solutions
  )

  useEffect(() => {
    dispatch(solutionGetExcludedRequest())
  }, [dispatch])

  return (
    <Container m="auto" maxW="90rem" p="10">
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
