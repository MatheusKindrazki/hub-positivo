import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { solutionsRequest } from '~/store/modules/solutions/actions'

import { Collapse } from '@psdhub/common/components'

import Container from './styles'
import { columns, data } from './mockTest'
import Table from './components/Table'

const AccessControl: React.FC = () => {
  const dispatch = useDispatch()

  const { data: solutions, loading: l } = useSelector(
    (state: Store.State) => state.solutions
  )

  useEffect(() => {
    dispatch(solutionsRequest())
  }, [dispatch])

  if (l) return <span>Carregando</span>

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
            <Table columns={columns} data={data} />
          </Collapse>
        )
      })}
    </Container>
  )
}

export default AccessControl
