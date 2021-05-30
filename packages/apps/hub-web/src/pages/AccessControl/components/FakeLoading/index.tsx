import React from 'react'

import Skeleton from '@psdhub/common/components/Skeleton'
import { Box } from '@psdhub/common/components'

const FakeLoadingCollapse: React.FC = () => {
  return (
    <Skeleton
      mt="8"
      width="100%"
      rounded="md"
      isLoaded={false}
      startColor="rgba(0, 0, 0, 0.11)"
      endColor="rgba(0, 0, 0, 0.18)"
      fadeDuration={1}
    >
      <Box
        width="90%"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        className="collapse-header"
        roundedTop="md"
        transition="all .2s linear"
        height="3rem"
      ></Box>
    </Skeleton>
  )
}

export default FakeLoadingCollapse
