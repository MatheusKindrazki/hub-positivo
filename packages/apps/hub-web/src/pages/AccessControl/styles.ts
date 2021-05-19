import styled from 'styled-components'

import { Box } from '@psdhub/common/components'

const Container = styled(Box)`
  .collapse-header {
    background-color: ${props => props.theme.colors?.blue[500]};
    height: 3rem;
    padding: 0.8125rem;
  }
`

export default Container
