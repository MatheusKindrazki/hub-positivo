import React from 'react'

import { renderHook } from '@testing-library/react-hooks'

import { render } from '@psdhub/test-utils'

import Text from '../../components/Text'
import Drawer, {
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '../../components/Drawer'

const DrawerComponent = () => {
  const onClose = jest.fn()
  return (
    <>
      <Drawer isOpen={true} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text>Header</Text>
            </DrawerHeader>
            <DrawerBody>
              <Text>Body</Text>
            </DrawerBody>
            <DrawerFooter>
              <Text>Footer</Text>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

describe('Testing if Drawer component render correctly', () => {
  it('should render open, as well must render Drawer Header, Body and Footer', () => {
    const { getByText } = render(<DrawerComponent />)

    const headerText = getByText('Header')
    const bodyText = getByText('Body')
    const footerText = getByText('Footer')

    expect(headerText).toBeInTheDocument()
    expect(bodyText).toBeInTheDocument()
    expect(footerText).toBeInTheDocument()
  })

  it('Drawer matches snapshot', () => {
    const wrapper = render(<DrawerComponent />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('testing useDesclosure', () => {
  const {
    result: { current }
  } = renderHook(() => useDisclosure())

  it('should returns the correct values', () => {
    expect(current.isOpen).toBeFalsy()
    expect(current.isControlled).toBeFalsy()

    expect(typeof current.onClose).toBe('function')
    expect(typeof current.onOpen).toBe('function')
    expect(typeof current.onToggle).toBe('function')
    expect(typeof current.getButtonProps).toBe('function')
    expect(typeof current.getDisclosureProps).toBe('function')
  })
})
