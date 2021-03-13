import React, { useMemo, useState } from 'react'

import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import {
  Box,
  Button,
  Heading,
  SpinnerLoader,
  SimpleGrid
} from '@hub/common/components'

import { amplitudeToolOpened } from '~/services/amplitude'

import { cardFilter } from '~/utils/cardFilter'

import GlobalStyle from './styles'
import { HeaderProps } from './index'
import Search from '../Search'
import Card from '../Card'

const HeaderDesktop: React.FC<HeaderProps> = ({ cards, handlePush }) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  const filterCards = useMemo(
    () =>
      cardFilter({ data: cards || [], search: search, typeCard: 'solucoes' }),
    [cards, search]
  )
  return (
    <div className="hub-header-list">
      <Button
        fontSize="0.875rem"
        backgroundColor="white"
        fontWeight="bold"
        color="blue.500"
        mx="1"
        type="button"
        className="button-header"
        onClick={() => setShow(!show)}
      >
        Produtos
      </Button>
      <CSSTransition
        in={show}
        timeout={400}
        unmountOnExit
        classNames="hub-menu"
      >
        <Box
          borderRadius="4px"
          boxShadow="dark-lg"
          border="1px solid #DADADA"
          w="330px"
          h="auto"
          maxHeight="65vh"
          overflow="hidden"
          background="white!important"
          onMouseLeave={() => setShow(false)}
          className={classNames({
            'hub-items': true
          })}
          paddingTop="2.5rem"
        >
          <Search handleChange={setSearch} style={{ zIndex: 9 }} />
          <Box
            w="100%"
            h="auto"
            maxHeight="60vh"
            overflow="auto"
            paddingTop="3.5rem"
            px="6"
            py="4"
          >
            {!cards || !cards.length ? (
              <Box
                w="100%"
                d="flex"
                justifyContent="center"
                alignItems="center"
              >
                <SpinnerLoader loading={true} color="var(--hub-base-color)" />
              </Box>
            ) : null}
            {filterCards?.map((card, i) => (
              <div key={String(i)}>
                <Box mb="4">
                  <Heading
                    as="h4"
                    className={classNames({ margin: i !== 0 })}
                    fontSize="sm"
                  >
                    {card.nome}
                  </Heading>
                </Box>
                <SimpleGrid templateColumns="repeat(3, 1fr)" spacing={3}>
                  {card.solucoes?.map(solucao => (
                    <Card
                      key={Math.random()}
                      card={{ ...solucao, cor: card.cor }}
                      onClick={e => {
                        amplitudeToolOpened({
                          card_name: solucao.nome,
                          location: 'header'
                        })
                        handlePush(e)
                        setShow(false)
                      }}
                    />
                  ))}
                </SimpleGrid>
              </div>
            ))}
          </Box>
        </Box>
      </CSSTransition>
      <GlobalStyle />
    </div>
  )
}

export default HeaderDesktop
