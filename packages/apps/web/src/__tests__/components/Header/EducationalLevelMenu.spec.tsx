import React from 'react'

import { fireEvent } from '@testing-library/dom'

import { setEducationalStage } from '~/store/modules/educationalStage/actions'
import { store } from '~/store'

import { render, waitFor } from '@psdhub/test-utils'

import { EducationalLevelMenu } from '~/components/Header/components'

describe('Header component should works as expected', () => {
  const CUSTOM_STATE = {
    profile: { name: 'Professor' },
    educationalStage: {
      levels: [
        { label: 'level 1', value: 'EI' },
        { label: 'level 2', value: 'EM' }
      ],
      level: 'EM'
    }
  }

  const setup = (customState = CUSTOM_STATE) =>
    render(<EducationalLevelMenu />, {
      store,
      reducers: ['educationalStage', 'profile'],
      CUSTOM_STATE: customState
    })

  it('should render levels on screen', () => {
    const levelLabels = ['level 1', 'level 2']

    const { getByText } = setup()

    levelLabels.forEach(label => expect(getByText(label)).toBeInTheDocument())
  })
  it('should dispatch an action when a level is clicked', async () => {
    const { getByText, storeUtils } = setup()

    await waitFor(() => fireEvent.click(getByText('level 1')))

    expect(storeUtils?.getActions()).toContainEqual(setEducationalStage('EI'))
  })

  it('should return null if no levels are found', async () => {
    const newState = CUSTOM_STATE

    newState.educationalStage.levels = []

    const { queryByText } = setup()

    expect(queryByText('level 1')).toBe(null)
  })
})
