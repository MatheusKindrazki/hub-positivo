import React from 'react'

import MatchMediaMock from 'jest-matchmedia-mock'

import { render, waitFor } from '@psdhub/test-utils'
import * as hooks from '@psdhub/common/hooks'

import { List } from '@chakra-ui/react'

import FooterLogo from '../../components/Footer/components/FooterLogo'
import FooterItem from '../../components/Footer/components/FooterItem'
import FooterColumn from '../../components/Footer/components/FooterColumn'
import Footer from '../../components/Footer/'

const footerData = [
  {
    title: 'suporte',
    active: true,
    items: [
      { name: 'email: atendimento@spe.com.br', active: true },
      { name: 'non active item', active: false }
    ]
  },
  {
    title: 'Jurídico',
    active: true,
    items: [
      {
        name: 'Copyright',
        active: true
      }
    ]
  },
  {
    title: 'Redes Sociais',
    active: true,
    items: [
      {
        name: 'Instagram',
        active: true,
        href: 'href_test_ig'
      }
    ]
  },
  {
    title: 'Saiba mais',
    active: true,
    items: [
      {
        name: 'Instagram',
        active: true,
        href: 'href_test_ig'
      }
    ]
  }
]

describe('FooterItem renders without crashing', () => {
  it('Should render /name/ on screen with a href link', async () => {
    const mockedData = { name: 'item name', href: 'item_href', active: true }
    const { getByTestId } = render(
      <List>
        <FooterItem data={mockedData} />
      </List>
    )

    expect(getByTestId('footer-link')).toBeInTheDocument()
    expect(getByTestId('footer-link')).toHaveAttribute('href', mockedData.href)
  })

  it('Should render /name/ on screen without a href link', () => {
    const mockedData = { name: 'item name', active: true }
    const { queryByText } = render(
      <List>
        <FooterItem data={mockedData} />
      </List>
    )
    const element = queryByText(mockedData.name)
    expect(element).not.toBeNull()
    expect(element).not.toHaveAttribute('href')
  })

  it('Shouldnt render item with no props', () => {
    const mockedData = {}
    const { queryByRole } = render(
      <List>
        <FooterItem data={mockedData as any} />
      </List>
    )
    const item = queryByRole('listitem')
    expect(item).toBeNull()
  })
})

describe('FooterColumn renders without crashing', () => {
  it('Should render /title/ prop', () => {
    const mockedData = {
      title: 'Footer Column',
      items: footerData[0].items,
      active: true
    }
    const { queryByText } = render(<FooterColumn {...mockedData} />)

    expect(queryByText(mockedData.title)).toBeInTheDocument()
  })

  it('Shouldnt render a non active column', () => {
    const { queryByText } = render(
      <FooterColumn
        items={footerData[0].items}
        title={'title'}
        active={false}
      />
    )

    expect(queryByText('title')).toBe(null)
  })

  it('Shouldnt render a non active item', () => {
    const { queryByText } = render(
      <FooterColumn items={footerData[0].items} title={'title'} active={true} />
    )

    expect(queryByText('non active item')).toBe(null)
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

describe('FooterModal component should work properly', () => {
  // mock do user disclosure para que o modal renderize inicialmente aberto
  jest.spyOn(hooks, 'useDisclosure').mockImplementation(() => ({
    isOpen: true,
    isControlled: true,
    onClose: () => {
      jest.fn()
    },
    onOpen: () => {
      jest.fn()
    },
    onToggle: () => {
      jest.fn()
    },
    getButtonProps: () => {
      jest.fn()
    },
    getDisclosureProps: () => {
      jest.fn()
    }
  }))
  const itemWithModal = {
    name: 'item with modal',
    active: true,
    modal: {
      content: 'this is a fake content for testing purposes',
      title: 'fake modal'
    }
  }
  it('Should render title and text content on desktop screen', async () => {
    jest.spyOn(hooks, 'useMediaQuery').mockReturnValue([true])
    const { getByText } = render(
      <List>
        <FooterItem data={itemWithModal} />
      </List>
    )
    await waitFor(() => {
      expect(
        getByText('this is a fake content for testing purposes')
      ).toBeInTheDocument()
      expect(getByText('fake modal')).toBeInTheDocument()
    })
  })

  it('Should render title and text content on mobile screen', () => {
    jest.spyOn(hooks, 'useMediaQuery').mockReturnValue([false])
    const { getByText } = render(
      <List>
        <FooterItem data={itemWithModal} />
      </List>
    )

    expect(
      getByText('this is a fake content for testing purposes')
    ).toBeInTheDocument()
    expect(getByText('fake modal')).toBeInTheDocument()
  })
})
