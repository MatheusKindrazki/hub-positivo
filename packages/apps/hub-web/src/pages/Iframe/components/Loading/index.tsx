import React from 'react'

import { PulseLoader } from 'react-spinners'

import { useTheme } from '@psdhub/common/layout/styles'
interface LoadingProps {
  loading: boolean
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const { colors } = useTheme()

  return (
    <PulseLoader
      color={colors.blue[500]}
      loading={loading}
      size={30}
      css={`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
      `}
    />
  )
}

export default Loading
