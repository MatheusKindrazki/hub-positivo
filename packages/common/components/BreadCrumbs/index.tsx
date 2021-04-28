import React from 'react'

import { CaretRight } from '@psdhub/common/components/Icons'
import { Box } from '@psdhub/common/components'

import {
  Breadcrumb as BreadCrumb,
  BreadcrumbItem as Item,
  BreadcrumbLink
} from '@chakra-ui/react'

interface Crumb {
  title: string
  href?: string
  iscurrentPage?: boolean
}

interface BreadCrumbProps {
  items: Crumb[]
}

// recebe um array com items que compoem o Breadcrumb

const Breadcrumb: React.FC<BreadCrumbProps> = ({ items }) => {
  return (
    <BreadCrumb
      fontSize="x-large"
      spacing="8px"
      separator={<Box as={CaretRight} />}
    >
      {items.map(item => (
        <Item key={item.title}>
          <BreadcrumbLink
            href={item.href ? `#/${item.href}` : undefined}
            isCurrentPage={!item.href}
          >
            {item.title}
          </BreadcrumbLink>
        </Item>
      ))}
    </BreadCrumb>
  )
}

export { Breadcrumb }
