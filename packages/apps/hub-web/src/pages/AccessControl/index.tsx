import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/solutions/types'
import { solutionsGetRequest } from '~/store/modules/solutions/actions'
import { schoolGetAllRequest } from '~/store/modules/school/actions'
import { categoryGetAllRequest } from '~/store/modules/category/actions'

import { Columns } from '@psdhub/common/components/Table'
import { Collapse } from '@psdhub/common/components'

import Header from '~/components/AccessControlHeader'

import { formatReturnDataFromAPI } from './utils/formatReturnDataFromAPI'
import Container from './styles'
import Table, { TableSolution } from './components/Table'
import Switch from './components/Switch'
import FakeLoadingCollapse from './components/FakeLoading'
import EditButton from './components/EditButton'

export interface CollapseData {
  nome: string
  solutions: TableSolution[]
}

export const columns: Columns[] = [
  { property: 'solution', header: 'Solução' },
  { property: 'profile', header: 'Perfis' },
  { property: 'schools', header: 'Escolas' },
  {
    property: 'edit',
    header: null,
    render: (e: PutSolutionData) => (
      <EditButton url={`/controle-de-acessos/editar/${e.slug}`} />
    )
  },
  {
    property: 'active',
    header: null,
    render: (e: PutSolutionData) => <Switch data={e} />
  }
]

const mock = [{}, {}, {}, {}, {}, {}, {}]

const AccessControl: React.FC = () => {
  const [solutions, setSolutions] = useState<CollapseData[] | null>(null)
  const { data, loading } = useSelector((state: Store.State) => state.solutions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(categoryGetAllRequest())
    dispatch(schoolGetAllRequest())
    if (data?.length) {
      setSolutions(formatReturnDataFromAPI(data))
    } else {
      dispatch(solutionsGetRequest())
    }
  }, [data, dispatch])

  return (
    <Container m="1" marginTop="10">
      <Header />
      {loading && mock.map((_, i) => <FakeLoadingCollapse key={i} />)}
      {solutions?.map(categoria => {
        return (
          <Collapse
            defaultIsOpen={false}
            grid={false}
            key={categoria.nome}
            nome={categoria.nome}
            id="1"
            cor="white"
            css={{
              background: 'white',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}
          >
            <Table columns={columns} data={categoria.solutions} />
          </Collapse>
        )
      })}
    </Container>
  )
}

export default AccessControl
