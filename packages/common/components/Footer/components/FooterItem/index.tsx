import React, { useRef } from 'react'

import { ListItem, Link } from '@chakra-ui/react'

import { ModalHandler, FooterModal } from '../FooterModal'
import { item } from '../FooterColumn'

interface ItemProps {
  data: item
}

const FooterItem: React.FC<ItemProps> = ({ data }) => {
  const modalRef = useRef<ModalHandler>(null)

  return (
    <>
      {data?.href && data.ativo && (
        <ListItem textColor="gray.600" fontWeight="400" mb="2">
          <Link href={data.href} fontWeight="400" color="gray.600">
            {data.name}
          </Link>
        </ListItem>
      )}

      {!data?.href && data.ativo && (
        <ListItem
          textColor="gray.600"
          fontWeight="400"
          mb="2"
          onClick={modalRef.current?.onOpen}
          _hover={
            data?.modal && { textDecoration: 'underline', cursor: 'pointer' }
          }
        >
          {data?.name}
        </ListItem>
      )}
      {data?.modal && <FooterModal ref={modalRef} modal={data.modal} />}
    </>
  )
}

export default FooterItem
