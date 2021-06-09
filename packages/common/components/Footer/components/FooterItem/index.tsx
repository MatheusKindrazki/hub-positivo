import React from 'react'

import { ListItem, Link } from '@chakra-ui/react'

import { item } from '../FooterColumn'

interface ItemProps {
  data: item
}

const FooterItem: React.FC<ItemProps> = ({ data }) => {
  return (
    <>
      {data?.href && (
        <ListItem textColor="gray.600" fontWeight="400" mb="2">
          <Link href={data.href} fontWeight="400" color="gray.600">
            {data?.name}
          </Link>
        </ListItem>
      )}

      {!data?.href && (
        <ListItem textColor="gray.600" fontWeight="400" mb="2">
          {data?.name}
        </ListItem>
      )}
    </>
  )
}

export default FooterItem
