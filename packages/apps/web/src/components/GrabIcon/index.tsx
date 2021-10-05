import React from 'react'

import Box, { BoxProps } from '@psdhub/common/components/Box'

const GrabIcon: React.FC<BoxProps> = props => {
  return (
    <Box {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="6" r="2" fill={'gray'} fillOpacity="0.6" />
        <circle cx="9" cy="12" r="2" fill={'gray'} fillOpacity="0.6" />
        <circle cx="9" cy="18" r="2" fill={'gray'} fillOpacity="0.6" />
        <circle cx="15" cy="6" r="2" fill={'gray'} fillOpacity="0.6" />
        <circle cx="15" cy="12" r="2" fill={'gray'} fillOpacity="0.6" />
        <circle cx="15" cy="18" r="2" fill={'gray'} fillOpacity="0.6" />
      </svg>
    </Box>
  )
}

export default GrabIcon
