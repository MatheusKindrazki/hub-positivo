import React, { useRef } from 'react'

import { ListItem, Link, Text } from '@psdhub/common/components'

import { ModalHandler, FooterModal } from '../FooterModal'
import { item } from '../FooterColumn'

interface ItemProps {
  data: item
}

const FooterItem: React.FC<ItemProps> = ({ data }) => {
  const modalRef = useRef<ModalHandler>(null)

  return (
    <>
      {data.href && data.active && (
        <ListItem textColor="gray.600" fontWeight="400" mb="2">
          <Link
            display="inline-block"
            target="_blank"
            href={data.href}
            fontWeight="400"
            color="gray.600"
            cursor="default"
          >
            <Text textDecoration="underline" cursor="pointer">
              {data.name}
            </Text>
          </Link>
        </ListItem>
      )}

      {!data.href && data.active && (
        <ListItem textColor="gray.600" fontWeight="400" mb="2">
          <Text
            display="inline-block"
            onClick={data.modal && modalRef.current?.onOpen}
            css={
              data.modal && { textDecoration: 'underline', cursor: 'pointer' }
            }
          >
            {data.name}
          </Text>
        </ListItem>
      )}
      {data.modal && <FooterModal ref={modalRef} modal={data.modal} />}
    </>
  )
}

export default FooterItem