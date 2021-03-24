import React from 'react'

import reactEvent from 'react-select-event'

import { store } from '~/store'

import { render, CustomState, fireEvent, waitFor } from '@hub/test-utils'

import history from '~/services/history'

import * as header from '~/components/Header/context'
import DeMobilesktop from '~/components/Header/components/Mobile'

import { useHeaderReturn } from '~/__mocks__/HeaderContext'

describe('Mobile Header component', () => {
  it('it', () => {
    expect(1).toBe(1)
  })
})
