import React, { useMemo, useState } from 'react'

import classNames from 'classnames'

import { DotsNine } from '@hub/common/components/Icons'
import Drawer, {
  DrawerContent,
  useDisclosure
} from '@hub/common/components/Drawer'
import {
  Box,
  Button,
  Heading,
  SpinnerLoader,
  SimpleGrid
} from '@hub/common/components'

import { amplitudeToolOpened } from '~/services/amplitude'

import { cardFilter } from '~/utils/cardFilter'

import GlobalStyle from './stylesMobile'
import { HeaderProps } from './index'
import Search from '../Search'
import Card from '../Card'

const HeaderMobile: React.FC<HeaderProps> = ({ cards, handlePush }) => {
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const filterCards = useMemo(
    () =>
      cardFilter({ data: cards || [], search: search, typeCard: 'solucoes' }),
    [cards, search]
  )

  const toggleMenu = () => {
    if (show) {
      onClose()
    } else {
      onOpen()
    }
    setSearch('')
    setShow(!show)
  }

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
        onClick={toggleMenu}
      >
        <Box as={DotsNine} size={24} />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={() => onClose()}>
        <DrawerContent
          mt={['41px', '41px']}
          position="relative"
          maxWidth="100vw"
        >
          <Box
            borderRadius="4px"
            boxShadow="dark-lg"
            border="1px solid #DADADA"
            w="100vw"
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
              maxHeight="90vh"
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
                          toggleMenu()
                        }}
                      />
                    ))}
                  </SimpleGrid>
                </div>
              ))}
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
      <GlobalStyle />
    </div>
  )
}

export default HeaderMobile
