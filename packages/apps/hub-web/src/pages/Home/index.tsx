import React, { useCallback, useEffect, useMemo, useState } from 'react'

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

import { authProductRequest } from '~/store/modules/authProduct/actions'
import { loading } from '~/store/modules/global/actions'
import { setLevel } from '~/store/modules/levelEducation/actions'
import { productRequest } from '~/store/modules/products/actions'
import { CardProduct as CardProductProps } from '~/store/modules/products/types'
import createSlug from '~/utils/createSlug'

import { mockAlunos, mockProfessores } from './mock'
import { Container } from './styles'

const enableSelect = ['professor', 'familia']

const Home: React.FC = () => {
  documentTitle('Home')

  const [dataTemp, setDataTemp] = useState()
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const { user, avatar, school: useSchool } = useSelector(
    (state: Store.State) => state.user
  )
  const { profile, name: nameProfile } = useSelector(
    (state: Store.State) => state.profile
  )

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
      setSearchValue(search)

      dispatch(loading(false))
    }, 1000)
  }, 550)

  const handlePushProduct = useCallback(
    data => {
      dispatch(
        authProductRequest({
          product: createSlug(data.nome),
          url: data.url,
          integration_type: data.integration_type
        })
      )
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(productRequest({}))
  }, [dispatch])

  const filterCards = useMemo(() => {
    if (!searchValue) return cards

    const newcards = [] as CardProductProps[]

    cards?.forEach(i => {
      i.solucoes?.forEach(card => {
        if (card.nome.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!newcards.length) {
            newcards.push({
              id: i.id,
              nome: i.nome,
              cor: i.cor,
              solucoes: i.solucoes
            })
          } else {
            const index = newcards.findIndex(newCard => newCard.id === i.id)

            const cardsNew = newcards[index]?.solucoes || []

            newcards[index] = {
              id: i.id,
              cor: i.cor,
              nome: i.nome,
              solucoes: [...cardsNew, card]
            }
          }
        }
      })
    })

    return newcards
  }, [cards, searchValue])

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
          <Welcome
            name={user?.name || ''}
            avatar={avatar}
            profile={nameProfile || ''}
            schoolName={useSchool?.label || ''}
          />

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
          {filterCards &&
            filterCards.map(card => (
              <Collapse
                key={Math.random()}
                cor={card.cor}
                id={card.id}
                nome={card.nome}
              >
                {card.solucoes?.map(item => (
                  <CardProduct
                    key={Math.random()}
                    handlePush={url =>
                      handlePushProduct({
                        url,
                        nome: item.nome,
                        integration_type: item.integration_type
                      })
                    }
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
