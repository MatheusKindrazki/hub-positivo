import React from 'react'

import FooterItem from '../FooterItem'
import { List, ListItem } from '../../../'

export interface ColumnProps {
  title: string
  active: boolean
  items: item[]
}

export interface item {
  name: string
  active: boolean
  href?: string
  modal?: { title: string; content: string }
}

const Column: React.FC<ColumnProps> = ({ title, items, active }) => {
  return (
    <>
      {active && (
        <List minH={[null, '8.5rem']} m="1" mt="3">
          <ListItem
            textTransform="capitalize"
            fontWeight="700"
            textColor="gray.600"
            mb="3"
          >
            {title}
          </ListItem>
          {items.map(item => {
            if (!item.active) return
            return <FooterItem data={item} key={item.name} />
          })}
        </List>
      )}
    </>
  )
}

export default Column
