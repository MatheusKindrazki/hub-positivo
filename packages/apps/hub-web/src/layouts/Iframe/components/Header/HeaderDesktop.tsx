import React, { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

import {
  Box,
  Button,
  Heading,
  SpinnerLoader,
  Avatar,
  SimpleGrid
} from '@hub/common/components'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import Card from '../Card'
import Search from '../Search'
import { cardFilter } from './cardFilter'
import { HeaderProps } from './index'
import GlobalStyle from './styles'

const HeaderDesktop: React.FC<HeaderProps> = ({ cards, handlePush }) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  const filterCards = useMemo(
    () => cardFilter({ data: cards || [], search: search }),
    [cards, search]
  )

  const { user, avatar } = useSelector((state: Store.State) => state.user)

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
      <Avatar
        width="2.5rem"
        color="#3C3C3C"
        height="2.5rem"
        backgroundColor="gray.400"
        name={user?.name || ''}
        src={avatar}
      />
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
