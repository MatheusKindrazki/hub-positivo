import styled from 'styled-components'

import SwitchUI from '@psdhub/common/components/Switch'

const Switch = styled(SwitchUI)`
  .switch-button {
    > span {
      background: var(--hub-base-color);

      &[data-checked] {
        background: var(--hub-colors-gray-400);
      }
    }
  }
`

export default Switch
