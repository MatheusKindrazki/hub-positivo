import styled from 'styled-components'

import SwitchUI from '@psdhub/common/components/Switch'

const Switch = styled(SwitchUI)`
  > span {
    background: ${props => props.theme.colors.gray[450]};

    &[data-checked] {
      background: ${props => props.theme.colors.blue[500]};
    }
  }
`

export default Switch
