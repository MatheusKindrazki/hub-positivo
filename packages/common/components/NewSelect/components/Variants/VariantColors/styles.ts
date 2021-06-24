import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

import { VariantType } from '../../../types'

interface SelectVariants {
  variant: VariantType
}

export const Container = styled(Box)<SelectVariants>`
  width: 100%;
  background: blue;

  > div {
    width: 100%;
    background-color: red;
  }
`
