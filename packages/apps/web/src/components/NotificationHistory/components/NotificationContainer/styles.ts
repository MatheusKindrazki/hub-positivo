import styled from 'styled-components'

import { FlexProps } from '@psdhub/common/components/Flex'
import { Flex as FlexUI } from '@psdhub/common/components'

interface Props extends FlexProps {
  isNew: boolean
}

export const Flex = styled(FlexUI)<Props>`
  position: relative;
  ::before {
    content: ${props => (props.isNew ? '""' : 'none')};
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 8px;
    top: 15.5px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: #f32c1e;
  }
`
