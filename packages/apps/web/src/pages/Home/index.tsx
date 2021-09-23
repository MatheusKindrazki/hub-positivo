import React, { useCallback, useMemo, useState } from 'react'

import { debounce } from 'ts-debounce'
import classNames from 'classnames'

import { useSelector, useDispatch } from 'react-redux'

import { openTour } from '~/store/modules/tour/actions'
import { loading } from '~/store/modules/global/actions'
import { preAuth } from '~/store/modules/authProduct/actions'

import documentTitle from '@psdhub/common/utils/documentTitle'
import createSlug from '@psdhub/common/utils/createSlug'
import { Box, Heading, Collapse, CardProduct } from '@psdhub/common/components'

import { notificationConnect } from '~/services/notificationConnect'
import { toolOpened } from '~/services/mixpanel/toolOpened'

import { cardFilter } from '~/utils/cardFilter'

import mockFakeLoading from '~/components/FakeCollapse/mock'
import FakeCollapse from '~/components/FakeCollapse'

import { Container } from './styles'
import HomeMenu from './components/HomeMenu'
import FakeLoadingCard from './components/FakeLoading'
const Home: React.FC = () => {
  documentTitle('Home')

  const dispatch = useDispatch()

  const [search, setSearchValue] = useState('')

  const { info } = useSelector((state: Store.State) => state.user)

  const { name: profile } = useSelector((state: Store.State) => state.profile)

  const { data: cards, loading: load } = useSelector(
    (state: Store.State) => state.products
  )
  const { loading: globalLoading } = useSelector(
    (state: Store.State) => state.global
  )

  const { steps } = useSelector((state: Store.State) => state.tour)

  const handleSearch = debounce(value => {
    dispatch(loading(true))

    setTimeout(() => {
      setSearchValue(value)

      dispatch(loading(false))
    }, 1000)
  }, 550)

  const handleOpenTour = useCallback(() => {
    dispatch(openTour(true))
  }, [dispatch])

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
      {info && profile && (
        <HomeMenu
          userInfo={{ name: info?.name, profile }}
          isTourActive={!steps?.length}
          handleOpenTour={handleOpenTour}
          handleSearch={handleSearch}
        />
      )}

      <Box as={Container} p="2" maxW="1400px" margin="0 auto">
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
