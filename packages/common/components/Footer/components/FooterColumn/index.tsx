import React from 'react'

import { List, Text } from '@chakra-ui/react'

import FooterItem from '../FooterItem'

export interface ColumnProps {
  title: string
  ativo: boolean
  items: item[]
}

export interface item {
  name: string
  ativo: boolean
  href?: string
  modal?: { title: string; content: string }
}

const Column: React.FC<ColumnProps> = ({ title, items, ativo }) => {
  return (
    <>
      {ativo && (
        <List minH={[null, '8.5rem']} m="1" mt="3">
          <Text
            textTransform="capitalize"
            fontWeight="700"
            textColor="gray.600"
            mb="3"
          >
            {title}
          </Text>
          {items.map(item => {
            if (!item.ativo) return
            return <FooterItem data={item} key={item.name} />
          })}
        </List>
      )}
    </>
  )
}

export default Column
