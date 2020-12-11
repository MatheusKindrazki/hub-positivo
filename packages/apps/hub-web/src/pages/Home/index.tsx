import React, { useCallback, useMemo, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import {
  Box,
  Heading,
  Welcome,
  Collapse,
  CardProduct
} from '@hub/common/components'
import SearchInput from '@hub/common/components/Search'
import Tour from '@hub/common/components/Tour'
import createSlug from '@hub/common/utils/createSlug'
import documentTitle from '@hub/common/utils/documentTitle'

import classNames from 'classnames'
import { debounce } from 'ts-debounce'

import { preAuth } from '~/store/modules/authProduct/actions'
import { loading } from '~/store/modules/global/actions'

import Filter from './components/Filter'
import stepProf from './stepsProf'
import { Container } from './styles'

const Home: React.FC = () => {
  documentTitle('Home')

  const [, setSearchValue] = useState('')
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

      dispatch(
        preAuth({
          product: slug,
          url: data.url,
          tipoRenderizacao: data.tipoRenderizacao
        })
      )
    },
    [dispatch]
  )

  const filterCards = useMemo(() => cards, [cards])

  return (
    <>
      <Tour onClosed={() => console.log()} open={true} steps={stepProf} />
      <Box
        py="5"
        px="4"
        pb={{
          sm: '0',
          md: '5'
        }}
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
