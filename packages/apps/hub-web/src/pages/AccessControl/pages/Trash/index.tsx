import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Solution } from '~/store/modules/solutions/types'
import { solutionGetExcludedRequest } from '~/store/modules/solutions/actions'

import Table, { Columns } from '@psdhub/common/components/Table'
import { Box } from '@psdhub/common/components'

import Container from './styles'
import RestaureSolutionButton from './components/RestaureSolutionButton'
import EmptyTrash from './components/EmptyTrash'
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
    property: 'restaure',
    header: null,
    render: (e: TableData) => <RestaureSolutionButton id={e.id} />
  }
]
const Trash: React.FC = () => {
  const dispatch = useDispatch()
  const { excluidas: data, loading: load } = useSelector(
    (state: Store.State) => state.solutions
  )

  useEffect(() => {
    console.log({ data })
    if (!data?.length) {
      dispatch(solutionGetExcludedRequest())
    }
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
