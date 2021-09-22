import React from 'react'

import { render } from '@psdhub/test-utils'

import Treeview from '../../../../../../components/NewSelect/components/Variants/Treeview'

describe('Treeview should work as expected', () => {
  it('Should render as expected', async () => {
    render(<Treeview />)
  })
})
