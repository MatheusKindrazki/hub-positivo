import React from 'react'

import * as reactDom from 'react-router-dom'

import * as redux from 'react-redux'

import { store } from '~/store'

import {
  render,
  fireEvent,
  waitFor,
  CustomRenderOptions
} from '@hub/test-utils'

import Home from '~/pages/Home'

describe('Testing that the Home page works correctly', () => {
  const setup = (contextConfig: CustomRenderOptions) => {
    const utils = render(<Home />, {
      store,
      reducers: ['user', 'profile', 'educationalStage', 'products', 'global'],
      ...contextConfig
    })
    return { ...utils }
  }

  it('getting started', () => {
    const contextConfig: CustomRenderOptions = {
      CUSTOM_STATE: {}
    }
    const wrapper = setup(contextConfig)
    wrapper.debug()
  })
})
