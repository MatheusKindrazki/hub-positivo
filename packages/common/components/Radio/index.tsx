import React from 'react'

import { useTheme } from '@psdhub/common/layout/styles'

import { RadioProps, Radio, forwardRef } from '@chakra-ui/react'

export type { RadioProps }

const RadioHub = forwardRef<RadioProps, 'input'>((props, ref) => {
  const { colors } = useTheme()
  return (
    <Radio
      background="transparent!important"
      ref={ref}
      color={`${colors.blue[500]}!important`}
      {...props}
    >
      {props.children}
    </Radio>
  )
})

export default RadioHub
