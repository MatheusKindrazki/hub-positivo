import React from 'react'

import { List, Text } from '@chakra-ui/react'

import FooterItem from '../FooterItem'

export interface ColumnProps {
  title: string
  items: item[]
}

export interface item {
  name: string
  href?: string
  value?: string
}

const Column: React.FC<ColumnProps> = ({ title, items }) => {
  return (
    <List minH="8.5rem" m="1">
      <Text
        textTransform="capitalize"
        fontWeight="700"
        textColor="gray.600"
        mb="3"
      >
        {title}
      </Text>
      {items.map(item => (
        <FooterItem data={item} key={item.name} />
      ))}
    </List>
  )
}

export default Column
