import React from 'react'

import { CardProduct } from '~/store/modules/products/types'

import { Menu, MenuList, MenuButton } from '@psdhub/common/components/Menu'
import { CaretRight } from '@psdhub/common/components/Icons'
import { Button } from '@psdhub/common/components'

import SimpleCard from '~/components/SimpleCard'

import { HandleProps } from '~/layouts/Solutions/components/Card'
export interface SubmenuProps {
  card: CardProduct
  handleClick: (solution: HandleProps) => void
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  isDesktop: boolean
}

const Submenu: React.FC<SubmenuProps> = ({
  card,
  handleClick,
  onOpen,
  onClose,
  isDesktop
}) => {
  return (
    <Menu
      placement={isDesktop ? 'right' : 'bottom'}
      preventOverflow
      onOpen={onOpen}
      onClose={onClose}
    >
      <MenuButton
        as={Button}
        variant="ghost"
        w="100%"
        py="1.6rem"
        rightIcon={<CaretRight />}
        fontWeight={700}
        fontSize="1.25rem"
        textAlign="start"
        color=" #3C3C3C"
        borderRadius="0"
        cursor="pointer"
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
        {card.solucoes.map(
          ({ nome, tipoRenderizacao, link, ...solution }, i) => (
            <SimpleCard
              _hover={{ background: '#EFEFEF' }}
              borderRadius="0.5rem"
              onClick={() =>
                handleClick({ nome, tipoRenderizacao, url: link || '' })
              }
              cursor="pointer"
              key={nome + i}
              title={nome}
              imageSrc={solution.arquivo}
            />
          )
        )}
      </MenuList>
    </Menu>
  )
}

export default Submenu
