import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

export const Container = styled(Box)`
  .trash-table {
    tr {
      th {
        background: ${props => props.theme.colors.blue[500]};
        color: white;
        width: 25%;
      }
      td {
        width: 25%;
      }
    }
  }
`
