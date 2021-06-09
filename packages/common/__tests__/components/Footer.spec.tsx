import React from 'react'

import { render } from '@psdhub/test-utils'

import { List } from '@chakra-ui/react'

import FooterItem from '../../components/Footer/components/FooterItem'

describe('FooterItem renders without crashing', () => {
  it('Should render /name/ on screen with a href link', () => {
    const name = 'item name'
    const href = 'item_href'
    const { queryByText } = render(
      <List>
        <FooterItem data={{ name, href }} />
      </List>
    )
    const element = queryByText(name)
    expect(element).not.toBeNull()
    expect(element).toHaveAttribute('href', href)
  })

  it('Should render /name/ on screen without a href link', () => {
    const name = 'item name'
    const { queryByText } = render(
      <List>
        <FooterItem data={{ name }} />
      </List>
    )
    const element = queryByText(name)
    expect(element).not.toBeNull()
    expect(element).not.toHaveAttribute('href')
  })
})
