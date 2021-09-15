import React from 'react'

import { CardProduct } from '~/store/modules/products/types'

import { Menu, MenuList, MenuButton } from '@psdhub/common/components/Menu'
import { CaretRight } from '@psdhub/common/components/Icons'
import { Button } from '@psdhub/common/components'

import SimpleCard from '~/components/SimpleCard'

export interface SubmenuProps {
  card: CardProduct
}

const Submenu: React.FC<SubmenuProps> = ({ card }) => {
  return (
    <Menu placement="bottom" preventOverflow>
      <MenuButton
        as={Button}
        variant="ghost"
        w="100%"
        py="1.6rem"
        cursor="pointer"
        rightIcon={<CaretRight />}
        fontWeight={700}
        fontSize="1.25rem"
        textAlign="start"
        color=" #3C3C3C"
        borderRadius="0"
        _hover={{
          background: '#EFEFEF'
        }}
        _active={{
          background: '#EFEFEF'
        }}
      >
        {card.nome}
      </MenuButton>
      <MenuList padding="0.5rem" minWidth="xs" border="1px solid #C9C9C9">
        {card.solucoes.map((s, i) => (
          <SimpleCard key={s.nome + i} title={s.nome} imageSrc={s.arquivo} />
        ))}
      </MenuList>
    </Menu>
  )
}

export default Submenu
