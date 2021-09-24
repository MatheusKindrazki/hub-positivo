import React from 'react'

import Skeleton from '@psdhub/common/components/Skeleton'
import { Stack } from '@psdhub/common/components'

const categories = [
  'category1',
  'category2',
  'category3',
  'category4',
  'category5'
]
const Category: React.FC = () => {
  return (
    <Stack>
      {categories.map((category, i) => (
        <Skeleton
          key={category + i}
          p="1.6rem"
          data-testid="category-skeleton"
          startColor="gray.100"
          endColor="gray.400"
        />
      ))}
    </Stack>
  )
}

export default Category
