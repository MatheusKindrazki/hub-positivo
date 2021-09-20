import React from 'react'

import { render } from '@psdhub/test-utils'

import Breadcrumbs from '../../../common/components/Breadcrumbs'

describe('Breadcrumbs should work properly', () => {
  it('Badge matches snapshot', () => {
    const title = 'Titulo'
    const href = 'href_link'
    const { queryByText } = render(<Breadcrumbs data={[{ title, href }]} />)
    const link = queryByText(title)

    expect(link).not.toBeNull()
    expect(link).toHaveAttribute('href', href)
  })
})
