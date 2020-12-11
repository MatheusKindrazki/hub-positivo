import React, { useMemo } from 'react'

import {
  Menu,
  Box,
  Button,
  Heading,
  SpinnerLoader,
  SimpleGrid
} from '@hub/common/components'

import classNames from 'classnames'

import Card from '../Card'
import Search from '../Search'
import { HeaderProps } from './index'
import GlobalStyle from './styles'

const HeaderDesktop: React.FC<HeaderProps> = ({ cards, handlePush }) => {
  const { MenuContainer, MenuButton, MenuList } = Menu

  const heightBox = useMemo(() => {
    const height = window.document.body.clientHeight / 1.7

    return !cards || !cards.length ? 'auto' : height
  }, [cards])

  return (
    <div className="hub-header-list">
      <MenuContainer>
        <MenuButton
          as={Button}
          fontSize="0.875rem"
          backgroundColor="white"
          fontWeight="bold"
          color="blue.500"
          mx="1"
          type="button"
        >
          Produtos
        </MenuButton>
        <MenuList
          style={{ zIndex: 9999 }}
          minW="300px"
          h="100%"
          borderRadius="0"
          background="transparent!important"
          border="none"
          boxShadow="none"
          className="hub-header-list"
          w="19rem"
        >
          <Box
            style={{ zIndex: 999999 }}
            borderRadius="4px"
            boxShadow="dark-lg"
            border="1px solid #DADADA"
            top="8px!important"
            w="100%"
            maxW="330px"
            h={heightBox}
            maxHeight="69vh"
            background="white!important"
            position="relative"
            className="hub-items"
            paddingTop="2.5rem"
          >
            <Box
              style={{ zIndex: 9999 }}
              w="100%"
              height="100%"
              overflow="auto"
              paddingTop="3.5rem"
              px="6"
              py="4"
            >
              <Search style={{ zIndex: 999999 }} />
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
              {cards?.map((card, i) => (
                <React.Fragment key={i}>
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
                        onClick={handlePush}
                      />
                    ))}
                  </SimpleGrid>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </MenuList>
      </MenuContainer>
      <GlobalStyle />
    </div>
  )
}

export default HeaderDesktop
