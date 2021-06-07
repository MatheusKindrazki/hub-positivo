import React from 'react'

import { Link, List, ListItem, Text } from '@chakra-ui/react'

export interface ColumnProps {
  title: string
  items: item[]
}

interface item {
  name: string
  href?: string
  value?: string
}

const Column: React.FC<ColumnProps> = ({ title, items }) => {
  return (
    <List>
      <Text textTransform="capitalize" fontWeight="700" textColor="gray.600">
        {title}
      </Text>
      {items?.map(item => {
        if (item?.href) {
          return (
            <ListItem>
              <Link
                key={item.name}
                href={item.href}
                fontWeight="400"
                textColor="gray.600"
              >
                {item.name}
              </Link>
            </ListItem>
          )
        }

        return (
          <ListItem textColor="gray.600" fontWeight="400" key={item.name}>
            {item.name}
          </ListItem>
        )
      })}
    </List>
  )
}

export default Column
