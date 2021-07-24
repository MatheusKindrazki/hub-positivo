import React from 'react'

import HubBadge, { BadgeProps as Props } from '@psdhub/common/components/Badge'

interface BadgeProps extends Props {
  itens: string[]
}

const Badges: React.FC<BadgeProps> = ({ itens, ...props }) => {
  return (
    <>
      {itens.map((item, index) => (
        <HubBadge color="blue.300" key={index} {...props}>
          {item}
        </HubBadge>
      ))}
    </>
  )
}

export default Badges
