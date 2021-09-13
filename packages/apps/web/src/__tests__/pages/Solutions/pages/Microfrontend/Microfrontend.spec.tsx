import React from 'react'

import { render, fireEvent } from '@psdhub/test-utils'

import * as startStop from '~/pages/Solutions/pages/Microfrontend/utils/startStop'
import MicrofrontendSolution from '~/pages/Solutions/pages/Microfrontend'
import * as Modules from '~/pages/Solutions/components/LoadModules'

jest.mock('@psdhub/common/layout/styles', () => {
  const rest = jest.requireActual('@psdhub/common/layout/styles')
  return {
    ...rest,
    useTheme: jest.fn(() => ({
      colors: {}
    }))
  }
})

jest.mock('~/pages/Solutions/pages/Microfrontend/utils/startStop', () => ({
  startStop: jest.fn(),
  startApp: jest.fn()
}))

jest.mock('randomstring', () => ({
  generate: () => 'radom-string'
}))

jest.mock('~/pages/Solutions/pages/Microfrontend/utils/startStop', () => ({
  startApp: jest.fn(),
  stopApp: jest.fn()
}))

jest.mock(
  '~/pages/Solutions/pages/Microfrontend/hooks/useRefreshToken',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)

jest.mock('~/pages/Solutions/pages/Microfrontend/communicator', () => ({
  __esModule: true,
  clearData: jest.fn(),
  default: jest.fn()
}))

jest.mock('~/pages/Solutions/components/LoadModules', () => ({
  __esModule: true,
  default: jest.fn(() => <span>LoadModules</span>)
}))

describe('MicrofrontendSolution should work properly', () => {
  it('Should render LoadModules and Box with /hub-radom-string-0/ class when scripts is provided', () => {
    const data = {
      scripts: [
        {
          type: 'script',
          url: 'url'
        }
      ],
      element_id: 'element_id'
    }

    window.loadedMicroFrontend = true

    const { container, queryByText } = render(
      <MicrofrontendSolution onLoaded={jest.fn()} data={data} />
    )

    expect(queryByText(/loadModules/i)).toBeInTheDocument()
    expect(
      container.getElementsByClassName('hub-radom-string-0')[0]
    ).toBeInTheDocument()
  })

  it('Should call handleNumberOfScriptsLoaded on LoadModules', () => {
    const data = {
      scripts: [
        {
          type: 'script',
          url: 'url'
        }
      ],
      element_id: 'element_id'
    }

    jest
      .spyOn(Modules, 'default')
      .mockImplementation(({ handleLoad }: any) => (
        <button onClick={() => handleLoadFn(handleLoad)}>LoadModulesBtn</button>
      ))

    const { getByText } = render(
      <MicrofrontendSolution onLoaded={jest.fn()} data={data} />
    )

    const handleLoadFn = jest.fn(handleLoad => handleLoad())

    fireEvent.click(getByText(/LoadModulesBtn/i))
    expect(handleLoadFn).toHaveBeenCalled()
  })

  it('Should call startStop`s functions when window.loadedMicroFrontend is false and quantityScripts?.length === scriptsLength', () => {
    const data = {
      scripts: [
        {
          type: 'css',
          url: 'url'
        }
      ],
      element_id: 'element_id'
    }

    window.loadedMicroFrontend = false

    const spyStartApp = jest.spyOn(startStop, 'startApp')
    const spyStopApp = jest.spyOn(startStop, 'stopApp')
    render(<MicrofrontendSolution onLoaded={jest.fn()} data={data} />)

    expect(spyStartApp).toHaveBeenCalled()
    expect(spyStopApp).toHaveBeenCalled()
  })

  it('Should NOT render LoadModules when scripts is NOT provided', () => {
    const wrapper = render(
      <MicrofrontendSolution onLoaded={jest.fn()} data={undefined} />
    )

    expect(wrapper.queryByText(/loadModules/i)).not.toBeInTheDocument()

    wrapper.rerender(<MicrofrontendSolution onLoaded={jest.fn()} data={{}} />)

    expect(wrapper.queryByText(/loadModules/i)).not.toBeInTheDocument()
  })
})
