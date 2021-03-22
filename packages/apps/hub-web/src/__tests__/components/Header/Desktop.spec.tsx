import React from 'react'

import { store } from '~/store'

import { render, CustomState } from '@hub/test-utils'

import { ContextHeaderProps } from '~/components/Header/context/types'
import Desktop from '~/components/Header/components/Desktop'

jest.mock('~/components/Header/context', () => ({
  useHeader: jest.fn().mockReturnValue({
    schoolList: [],
    roleList: [],
    setSchool: jest.fn(),
    setRole: jest.fn(),
    resetInfo: jest.fn(),
    defaultValue: {
      school: { value: 'value', label: 'label' },
      role: { value: 'value', label: 'label' }
    }
  } as ContextHeaderProps)
}))

describe('get started', () => {
  const setup = (CUSTOM_STATE = {} as CustomState) => {
    const openModalPass = jest.fn()
    const wrapper = render(<Desktop openModalPass={openModalPass} />, {
      reducers: ['tour', 'user', 'profile'],
      store,
      CUSTOM_STATE
    })
    return { ...wrapper }
  }
  it('it', () => {
    const wrapper = setup()
  })
})
