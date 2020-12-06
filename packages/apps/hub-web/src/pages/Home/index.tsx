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

import classNames from 'classnames'
import { debounce } from 'ts-debounce'

import { authProductRequest } from '~/store/modules/authProduct/actions'
import { loading } from '~/store/modules/global/actions'
import { setLevel } from '~/store/modules/levelEducation/actions'
import { productRequest } from '~/store/modules/products/actions'
import { CardProduct as CardProductProps } from '~/store/modules/products/types'
import createSlug from '~/utils/createSlug'

import { mockAlunos, mockProfessores } from './mock'
import { Container } from './styles'

// const enableSelect = ['Professor', 'Família']
const enableSelect = ['Professor']

const apiArvore = ['SAE + C', 'Árvore Livros']

const Home: React.FC = () => {
  documentTitle('Home')

  const [dataTemp, setDataTemp] = useState()
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const { user, avatar, school: useSchool } = useSelector(
    (state: Store.State) => state.user
  )
  const { name: nameProfile } = useSelector(
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

      if ((nameProfile as string).includes('Professor')) {
        dispatch(setLevel(data.label))

        dispatch(productRequest({}))
      }

      setTimeout(() => {
        dispatch(loading(false))
      }, 2000)
    },
    [dispatch, nameProfile]
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
      const slug = createSlug(data.nome)

      if (apiArvore.includes(data.nome)) {
        window.location.assign(data.url)

        return
      }

      dispatch(
        authProductRequest({
          product: slug,
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
    if (!searchValue) {
      return cards?.map(c => {
        return {
          ...c,
          solucoes: c.solucoes.filter(s => s.ativo)
        }
      })
    }

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

    return newcards?.map(c => {
      return {
        ...c,
        solucoes: c.solucoes.filter(s => s.ativo)
      }
    })
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
            {enableSelect.includes(nameProfile as string) && (
              <Select
                key={nameProfile as string}
                variant="blue-transparent"
                value={dataTemp}
                onChange={e => {
                  handleSelectProfile(e)
                }}
                defaultValue={
                  (nameProfile as string).includes('Professor')
                    ? mockProfessores[0]
                    : mockAlunos[0]
                }
                placeholder={
                  (nameProfile as string).includes('Professor')
                    ? 'Nível de ensino'
                    : 'Selecione o Familiar'
                }
                options={
                  (nameProfile as string).includes('Professor')
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
            filterCards.map((card, i) => (
              <Collapse
                key={Math.random()}
                cor={card.cor}
                id={card.id}
                nome={card.nome}
                className={classNames({
                  isLine: i !== 0
                })}
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
