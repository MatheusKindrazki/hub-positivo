import React from 'react'

import { render } from '@psdhub/test-utils'

import LoadModules from '~/pages/Solutions/components/LoadModules'

jest.mock('randomstring', () => ({
  generate: () => 'radom-string'
}))

jest.mock('react-helmet', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactChildren }) => <>{children}</>
}))

describe('LoadModules should work properly', () => {
  it('Should render a script with correct attributes', () => {
    const url = 'url-test'
    const hash = 'hash-test'
    const handleLoad = jest.fn()
    const wrapper = render(
      <LoadModules handleLoad={handleLoad} hash={hash} type={''} url={url} />
    )

    const script = wrapper.queryByTestId('loadModules-script')
    expect(script).toBeInTheDocument()
    expect(script).toHaveAttribute('src', `${url}?hash=${hash}`)
    expect(script).toHaveAttribute('id', 'hub-mcf-radom-string')
  })

  it('Should render a css link with correct attributes', () => {
    const url = 'url-test'
    const hash = 'hash-test'
    const handleLoad = jest.fn()
    const wrapper = render(
      <LoadModules handleLoad={handleLoad} hash={hash} type="css" url={url} />
    )

    const link = wrapper.queryByTestId('loadModules-css-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `${url}?hash=${hash}`)
    expect(link).toHaveAttribute('id', 'hub-mcf-radom-string')
  })
})
