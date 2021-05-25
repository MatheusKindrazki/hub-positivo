import React, { useEffect } from 'react'

import { useHistory } from 'react-router'

import { useSelector, useDispatch } from 'react-redux'

import { PutSolutionData } from '~/store/modules/solutions/types'
import { solutionsGetRequest } from '~/store/modules/solutions/actions'
import { schoolGetAllRequest } from '~/store/modules/school/actions'
import { categoryGetAllRequest } from '~/store/modules/category/actions'

import { Columns } from '@psdhub/common/components/Table'
import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { solutionsTableDataFormat } from './components/Table/utils/solutionsTableDataFormat'
import Table, { TableSolution } from './components/Table'
import Switch from './components/Switch'
import Header from './components/Header'
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
      <EditButton
        url={`/controle-de-acessos/editar/${e.slug}`}
        solutionId={e.id}
      />
    )
  },
  {
    property: 'active',
    header: null,
    render: (e: any) => (
      <Switch data={e} onChangeSwitch={e.onChangeSwitch} index={e.index} />
    )
  }
]

const mock = [{}, {}, {}, {}, {}, {}, {}]

const AccessControl: React.FC = () => {
  const { publicadas = [], loading } = useSelector(
    (state: Store.State) => state.solutions
  )
  const { profile } = useSelector((state: Store.State) => state.profile)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile !== 'administrador') {
      history.push('/')
    }
  }, [profile, history])

  useEffect(() => {
    dispatch(categoryGetAllRequest())
    dispatch(schoolGetAllRequest())
    if (!publicadas.length) {
      dispatch(solutionsGetRequest())
    }
  }, [dispatch, publicadas])

  return (
    <Container m="auto" maxW="90rem" p="10">
      <Header />
      {loading && mock.map((_, i) => <FakeLoadingCollapse key={i} />)}
      {!loading &&
        solutionsTableDataFormat(publicadas)?.map(categoria => {
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
