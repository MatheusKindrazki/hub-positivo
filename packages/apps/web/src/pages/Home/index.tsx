import React, { useCallback, useMemo, useState } from 'react'

import { debounce } from 'ts-debounce'
import classNames from 'classnames'

import { useSelector, useDispatch } from 'react-redux'

import { loading } from '~/store/modules/global/actions'
import { preAuth } from '~/store/modules/authProduct/actions'

import documentTitle from '@psdhub/common/utils/documentTitle'
import createSlug from '@psdhub/common/utils/createSlug'
import SearchInput from '@psdhub/common/components/Search'
import {
  Box,
  Heading,
  Welcome,
  Collapse,
  CardProduct
} from '@psdhub/common/components'

import { toolOpened } from '~/services/mixpanel/toolOpened'

import { cardFilter } from '~/utils/cardFilter'

import mockFakeLoading from '~/components/FakeCollapse/mock'
import FakeCollapse from '~/components/FakeCollapse'

import { Container } from './styles'
import Filter from './components/Filter'
import FakeLoadingCard from './components/FakeLoading'
const Home: React.FC = () => {
  documentTitle('Home')

  const dispatch = useDispatch()

  const [search, setSearchValue] = useState('')

  const {
    info: user,
    avatar,
    school: useSchool
  } = useSelector((state: Store.State) => state.user)

  const { name: nameProfile } = useSelector(
    (state: Store.State) => state.profile
  )
  const { class: userClass } = useSelector(
    (state: Store.State) => state.educationalStage
  )
  const { data: cards, loading: load } = useSelector(
    (state: Store.State) => state.products
  )
  const { loading: globalLoading } = useSelector(
    (state: Store.State) => state.global
  )

  const handleSearch = debounce(value => {
    dispatch(loading(true))

    setTimeout(() => {
      setSearchValue(value)

      dispatch(loading(false))
    }, 1000)
  }, 550)

  const handlePushProduct = useCallback(
    data => {
      const slug = createSlug(data.nome)

      toolOpened({
        card_name: data.nome,
        location: 'dashboard'
      })
      dispatch(
        preAuth({
          product: slug,
          name: data.nome,
          url: data.url,
          tipoRenderizacao: data.tipoRenderizacao
        })
      )
    },
    [dispatch]
  )

  const filterCards = useMemo(
    () =>
      cardFilter({ data: cards || [], search: search, typeCard: 'solucoes' }),
    [cards, search]
  )

  return (
    <>
      <Box
        py="5"
        px="4"
        pb={{ sm: '0', md: '5' }}
        backgroundColor="blue.500"
        className="background-animate"
      >
        <Box
          maxW="1400px"
          px={['0', '4']}
          margin="0 auto"
          d="flex"
          justifyContent="space-between"
          alignItems={['center', 'flex-start', 'flex-start', 'center']}
          flexDirection={['column', 'column', 'column', 'row']}
        >
          <Welcome
            name={user?.name || ''}
            avatar={avatar}
            profile={nameProfile || ''}
            schoolName={useSchool?.label || ''}
            educational_stage={nameProfile === 'Aluno' ? userClass : undefined}
          />

          <Box
            w="100%"
            maxW={['100%', '100%', '100%', '308px']}
            mt={['5', '5', '5', '0']}
          >
            <Filter />
          </Box>
        </Box>
      </Box>
      <Box as={Container} p="4" maxW="1400px" margin="0 auto">
        <SearchInput
          placeholder="Buscar soluções"
          backgroundColor="white!important"
          onChange={handleSearch}
        />
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDirection="column"
        >
          {!load && !globalLoading && filterCards ? (
            filterCards.map((card, i) => (
              <Collapse
                key={card.id}
                disable
                cor={card.cor}
                id={card.id}
                nome={card.nome}
                className={classNames({
                  isLine: i !== 0
                })}
              >
                {card.solucoes?.map(item => (
                  <CardProduct
                    key={item.id}
                    handlePush={url =>
                      handlePushProduct({
                        url,
                        nome: item.nome,
                        tipoRenderizacao: item.tipoRenderizacao
                      })
                    }
                    cor={card.cor}
                    category={card.nome}
                    card={item}
                    load={load}
                  />
                ))}
              </Collapse>
            ))
          ) : (
            <>
              {mockFakeLoading.map((item, index) => (
                <FakeCollapse key={index} id={String(index)}>
                  {item.cardMock.map((_, i) => (
                    <FakeLoadingCard key={i} />
                  ))}
                </FakeCollapse>
              ))}
            </>
          )}
        </Box>

        {!cards?.length && !load && !globalLoading ? (
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