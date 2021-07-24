import React from 'react'

import Box from '@psdhub/common/components/Box'
import HubBadge, { BadgeProps as Props } from '@psdhub/common/components/Badge'

interface BadgeProps extends Props {
  itens: string[]
}

const Badges: React.FC<BadgeProps> = ({ itens, ...props }) => {
  return (
    <Box d="flex" noOfLines={1}>
      {itens.map((item, index) => (
        <HubBadge
          mx={index !== 0 ? '2px' : '0'}
          color="blue.300"
          key={index}
          {...props}
        >
          {item}
        </HubBadge>
      ))}
    </Box>
  )
}

export default Badges
