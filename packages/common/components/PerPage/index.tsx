import React from 'react'

import classNames from 'classnames'

import Menu, { MenuList, MenuItem } from '@psdhub/common/components/Menu'
import { CaretDown } from '@psdhub/common/components/Icons'
import { Box, Text } from '@psdhub/common/components'

export interface PerPageProps {
  title: string
  currentItem: string | number
  itens: string[] | number[]
  onClick(item: string | number): void
}

const PerPage: React.FC<PerPageProps> = props => {
  const { title, itens, currentItem, onClick } = props
  return (
    <Box d="inline-flex" justifyContent="space-between" alignItems="center">
      <Box mr="4">
        <Text>{title}</Text>
      </Box>
      <Menu
        title={String(currentItem)}
        rightIcon={CaretDown}
        menuButton={{ minW: '4rem', bg: 'white' }}
      >
        <MenuList borderColor="gray.400" minW="4rem" maxW="auto">
          {itens.map((item, index) => (
            <MenuItem
              px={3}
              py={2}
              className={classNames({
                active: currentItem === item
              })}
              bg={currentItem === item ? 'blue.500' : 'transparent'}
              color={currentItem === item ? 'white' : 'black'}
              key={index}
              onClick={() => onClick(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default PerPage
