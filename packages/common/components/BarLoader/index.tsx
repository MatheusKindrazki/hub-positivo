import React from 'react'

import { BarLoader as Loading } from 'react-spinners'

import { useTheme } from '../../layout'

type BarProps = typeof Loading.defaultProps

const BarLoader: React.FC<BarProps> = ({ loading, ...rest }) => {
  const { colors } = useTheme()

  return (
    <Loading
      color={colors.blue[500]}
      width="100%"
      height="5px"
      loading={loading}
      css={`
        border-radius: 8px;
        position: fixed;
        top: 0
        bottom:0;
      `}
      {...rest}
    />
  )
}

export default BarLoader
