import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { solutionsRequest } from '~/store/modules/solutions/actions'

import { Columns } from '@psdhub/common/components/Table'
import { Collapse } from '@psdhub/common/components'

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
    render: (e: TableSolution) => <EditButton url={`/${e.id}`} />
  },
  {
    property: 'active',
    header: null,
    render: (e: TableSolution) => <Switch activated={e.activated} />
  }
]

const mock = [{}, {}, {}, {}, {}, {}, {}]

const AccessControl: React.FC = () => {
  const [solutions, setSolutions] = useState<CollapseData[] | null>(null)
  const { data } = useSelector((state: Store.State) => state.solutions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(solutionsRequest())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      setSolutions(formatReturnDataFromAPI(data))
    }
  }, [data])

  if (!data?.length) {
    return (
      <Container m="1">
        {mock.map((_, i) => (
          <FakeLoadingCollapse key={i} />
        ))}
      </Container>
    )
  }

  return (
    <Container m="1">
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
