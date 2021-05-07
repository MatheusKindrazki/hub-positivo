import React from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

import { CaretRight } from '../Icons'
import Box from '../Box'

interface Item {
  title: string
  href?: string
}
interface BreadcrumbsProps {
  data: Item[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ data }) => {
  return (
    <Box d="flex" flexDir="row" ml={['0', '12vw']}>
      <Breadcrumb
        fontSize={['large', 'x-large']}
        spacing={['0.5', '1']}
        separator={<Box as={CaretRight} />}
      >
        {data.map(item => {
          return (
            <BreadcrumbItem key={item.title}>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
          )
        })}
      </Breadcrumb>
    </Box>
  )
}

export default Breadcrumbs
