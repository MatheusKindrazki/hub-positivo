import React, { useMemo, useState } from 'react'
import { useCallback } from 'react'

import {
  Box,
  Button,
  Heading,
  SpinnerLoader,
  SimpleGrid
} from '@hub/common/components'
import { DotsNine } from '@hub/common/components/Icons'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import Card from '../Card'
import Search from '../Search'
import { cardFilter } from './cardFilter'
import { HeaderProps } from './index'
import GlobalStyle from './stylesMobile'

const HeaderMobile: React.FC<HeaderProps> = ({ cards, handlePush }) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  const filterCards = useMemo(
    () => cardFilter({ data: cards || [], search: search }),
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
        <Box as={DotsNine} size={24} />
      </Button>
      <CSSTransition
        in={show}
        timeout={{
          appear: 400,
          enter: 400,
          exit: 100
        }}
        classNames="hub-menu"
        unmountOnExit
      >
        <Box
          borderRadius="4px"
          boxShadow="dark-lg"
          border="1px solid #DADADA"
          w="360px"
          h="auto"
          overflow="auto"
          background="white!important"
          className={classNames({
            'hub-items': true
          })}
          paddingTop="2.5rem"
        >
          <Search handleChange={setSearch} style={{ zIndex: 9 }} />
          <Box
            w="100%"
            h="auto"
            maxHeight="87vh"
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

export default HeaderMobile
