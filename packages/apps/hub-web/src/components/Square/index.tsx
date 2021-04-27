import React from 'react'

import { Box } from '@psdhub/common/components'

const Square: React.FC = () => {
  return (
    <Box>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="#1565C0" />
      </svg>
    </Box>
  )
}

export default Square
