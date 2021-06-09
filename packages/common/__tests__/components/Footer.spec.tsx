import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import { render } from '@psdhub/test-utils'

import { List } from '@chakra-ui/react'

import FooterLogo from '../../components/Footer/components/FooterLogo'
import FooterItem from '../../components/Footer/components/FooterItem'
import FooterColumn from '../../components/Footer/components/FooterColumn'
import Footer from '../../components/Footer/'

const footerData = [
  {
    title: 'suporte',
    items: [{ name: 'email: atendimento@spe.com.br' }]
  },
  {
    title: 'Jurídico',
    items: [
      {
        name: 'Copyright'
      }
    ]
  },
  {
    title: 'Redes Sociais',
    items: [
      {
        name: 'Instagram',
        href: 'href_test_ig'
      }
    ]
  },
  {
    title: 'Saiba mais',
    items: [
      {
        name: 'Instagram',
        href: 'href_test_ig'
      }
    ]
  }
]

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

describe('FooterColumn renders without crashing', () => {
  it('Should render /title/ prop', () => {
    const title = 'Footer Column'
    const item = footerData[0].items
    const { queryByText } = render(<FooterColumn items={item} title={title} />)

    const element = queryByText(title)
    expect(element).toBeInTheDocument()
  })

  it('Should match snapshot', () => {
    const wrapper = render(
      <FooterColumn items={footerData[0].items} title={'title'} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})

describe('FooterLogo component', () => {
  it('Should match snapshot', () => {
    const wrapper = render(<FooterLogo />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Footer component should work properly', () => {
  it('Should match snapshot on desktop screen', () => {
    const matchMedia = new MatchMediaMock()
    matchMedia.useMediaQuery('(min-width: 96em)')
    const wrapper = render(<Footer columns={footerData.slice(0, 1)} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match snapshot on mobile screen', () => {
    const matchMedia = new MatchMediaMock()
    matchMedia.useMediaQuery('(min-width: 15em)')
    const wrapper = render(<Footer columns={footerData} />)
    expect(wrapper).toMatchSnapshot()
  })
})
