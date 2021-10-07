import styled from 'styled-components'

import { FlexProps } from '@psdhub/common/components/Flex'
import { Flex as FlexUI } from '@psdhub/common/components'

interface Props extends FlexProps {
  read: boolean
}

export const Flex = styled(FlexUI)<Props>`
  position: relative;
  ::before {
    content: ${props => (!props.read ? '""' : 'none')};
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 9px;
    top: 14px;
    border: 2px solid white;
    border-radius: 50%;
    background-color: #f32c1e;
  }
`
