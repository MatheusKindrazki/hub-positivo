import React from 'react'

import { useTheme } from '@psdhub/common/layout'
import { Box } from '@psdhub/common/components'

const GrabIcon: React.FC = () => {
  const { colors } = useTheme()
  return (
    <Box>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="6" r="2" fill={colors.gray[300]} fillOpacity="0.6" />
        <circle
          cx="9"
          cy="12"
          r="2"
          fill={colors.gray[300]}
          fillOpacity="0.6"
        />
        <circle
          cx="9"
          cy="18"
          r="2"
          fill={colors.gray[300]}
          fillOpacity="0.6"
        />
        <circle
          cx="15"
          cy="6"
          r="2"
          fill={colors.gray[300]}
          fillOpacity="0.6"
        />
        <circle
          cx="15"
          cy="12"
          r="2"
          fill={colors.gray[300]}
          fillOpacity="0.6"
        />
        <circle
          cx="15"
          cy="18"
          r="2"
          fill={colors.gray[300]}
          fillOpacity="0.6"
        />
      </svg>
    </Box>
  )
}

export default GrabIcon
