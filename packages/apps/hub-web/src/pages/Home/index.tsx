import React, { useCallback, useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Heading,
  Select,
  Welcome,
  Collapse,
  CardProduct
} from '@hub/common/components'
import SearchInput from '@hub/common/components/Search'
import documentTitle from '@hub/common/utils/documentTitle'

import { debounce } from 'ts-debounce'

import { loading } from '~/store/modules/global/actions'
import { setLevel } from '~/store/modules/levelEducation/actions'
import { productRequest } from '~/store/modules/products/actions'

import { mockAlunos, mockProfessores } from './mock'
import { Container } from './styles'

const enableSelect = ['professor', 'familia']

const Home: React.FC = () => {
  documentTitle('Home')

  const [dataTemp, setDataTemp] = useState()

  const dispatch = useDispatch()

  const { profile } = useSelector((state: Store.State) => state.profile)

  const { data: cards, loading: load } = useSelector(
    (state: Store.State) => state.products
  )

  const handleSelectProfile = useCallback(
    data => {
      setDataTemp(data)
      if (!data.profile) return false

      dispatch(loading(true))

      if ((profile as string).includes('professor')) {
        dispatch(setLevel(data.label))
      }

      setTimeout(() => {
        dispatch(loading(false))
      }, 2000)
    },
    [dispatch, profile]
  )

  const handleSearch = debounce(search => {
    dispatch(loading(true))

    setTimeout(() => {
      dispatch(
        productRequest({
          search
        })
      )

      dispatch(loading(false))
    }, 2000)
  }, 550)

  useEffect(() => {
    dispatch(productRequest({}))
  }, [dispatch])

  return (
    <>
      <Box
        py="5"
        px="4"
        backgroundColor="blue.500"
        className="background-animate"
      >
        <Box
          maxW="1400px"
          px={['0', '4']}
          margin="0 auto"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Welcome name="Matheus Kindrazki" />

          <Box
            w="100%"
            maxW={['100%', '100%', '100%', '308px']}
            mt={['5', '5', '5', '0']}
          >
            {enableSelect.includes(profile as string) && (
              <Select
                key={profile as string}
                variant="blue-transparent"
                value={dataTemp}
                onChange={e => {
                  handleSelectProfile(e)
                }}
                defaultValue={
                  (profile as string).includes('professor')
                    ? mockProfessores[0]
                    : mockAlunos[0]
                }
                placeholder={
                  (profile as string).includes('professor')
                    ? 'Nível de ensino'
                    : 'Selecione o Familiar'
                }
                options={
                  (profile as string).includes('professor')
                    ? mockProfessores
                    : mockAlunos
                }
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box as={Container} p="4" maxW="1400px" margin="0 auto">
        <SearchInput
          backgroundColor="white!important"
          onChange={handleSearch}
        />
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          {cards &&
            cards.map(card => (
              <Collapse
                key={card.id}
                cor={card.cor}
                id={card.id}
                nome={card.nome}
              >
                {card.solucoes?.map(item => (
                  <CardProduct
                    key={item.id}
                    handlePush={url => console.log(url)}
                    cor={card.cor}
                    card={item}
                    load={load}
                  />
                ))}
              </Collapse>
            ))}
        </Box>

        {!cards?.length && !load ? (
          <Box mt="5">
            <Heading as="h5" fontSize="1.5rem" color="blue.500">
              Nenhum produto encontrado!
            </Heading>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default Home
