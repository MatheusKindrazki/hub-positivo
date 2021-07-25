import React, { useContext } from 'react'

import { truncateString } from '@psdhub/common/utils/truncateString'
import Box from '@psdhub/common/components/Box'
import HubBadge, { BadgeProps as Props } from '@psdhub/common/components/Badge'

import SelectContext from '../../context'

interface BadgeProps extends Props {
  itens: string[]
}

const Badges: React.FC<BadgeProps> = ({ itens, ...props }) => {
  const { labelLength } = useContext(SelectContext)
  return (
    <Box d="flex" noOfLines={1}>
      {itens.map((item, index) => (
        <HubBadge
          mx={index !== 0 ? '2px' : '0'}
          color="blue.300"
          key={index}
          {...props}
        >
          {labelLength ? truncateString(item, labelLength) : item}
        </HubBadge>
      ))}
    </Box>
  )
}

export default Badges
