import styled from 'styled-components'

import SwitchUI from '@psdhub/common/components/Switch'

export const Switch = styled(SwitchUI)`
  > span {
    background: ${props => props.theme.colors?.gray[400]};

    &[data-checked] {
      background: ${props => props.theme.colors?.blue[500]};
    }
  }
`
