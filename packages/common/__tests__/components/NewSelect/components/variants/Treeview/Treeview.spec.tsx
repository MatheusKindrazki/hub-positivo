import React from 'react'

import { render } from '@psdhub/test-utils'

// import * as context from '../../../components/NewSelect/context'
import Treeview from '../../../../../../components/NewSelect/components/Variants/Treeview'

describe('Treeview should work as expected', () => {
  it('Should render as expected', async () => {
    render(<Treeview />)
  })
})
