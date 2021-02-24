import React, { useEffect, useMemo, useState } from 'react'

import { debounce } from 'ts-debounce'
import classNames from 'classnames'

import { useDispatch, useSelector } from 'react-redux'

import { classesRequest } from '~/store/modules/myClasses/actions'

import { documentTitle } from '@hub/common/utils'
import SearchInput from '@hub/common/components/Search'
import { Heading, Box, Collapse } from '@hub/common/components'

import CardAlunos from './components/CardAlunos'
import { cardFilter } from './cardFilter'

const MyClasses: React.FC = () => {
  documentTitle('Minhas Turmas')

  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const { classes } = useSelector((state: Store.State) => state.myClasses)

  useEffect(() => {
    dispatch(classesRequest())
  }, [dispatch])

  const handleSearch = debounce(value => {
    setSearch(value)
  }, 550)

  const filterCards = useMemo(
    () => cardFilter({ data: classes || [], search: search }),
    [classes, search]
  )
  return (
    <Box mx={[3, 0]}>
      <Box
        maxW="1400px"
        px={['0', '3']}
        margin="0 auto"
        mt="32px"
        d="flex"
        justifyContent="space-between"
        alignItems={['center', 'flex-start', 'flex-start', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Box width="100%">
          <Heading fontSize="1.875rem" fontWeight="normal">
            Minhas Turmas
          </Heading>
          <Box py={['0.75rem', '1.75rem']}>
            <SearchInput
              placeholder="Buscar alunos"
              backgroundColor="white!important"
              onChange={handleSearch}
            />
          </Box>
        </Box>
      </Box>
      <Box
        d="flex"
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="space-between"
        maxW="1400px"
        margin="0 auto"
        px={['0', '4']}
      >
        {filterCards &&
          filterCards.map((classe, i) => (
            <Collapse
              key={i}
              cor="blue.500"
              id={String(i)}
              nome={`${classe.nome} - ${classe?.serie?.nome}`}
              className={classNames({
                isLine: i !== 0
              })}
            >
              {classe.alunos
                ?.filter(a => a.ativo)
                .map(aluno => (
                  <CardAlunos key={aluno.idUsuarioUnico} {...aluno} />
                ))}
            </Collapse>
          ))}
      </Box>
    </Box>
  )
}

export default MyClasses
