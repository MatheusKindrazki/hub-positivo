import React from 'react'

import amplitude from 'amplitude-js'
import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import { store } from '~/store'

import { useAmplitudeSetProperties } from '~/hooks/amplitude/useAmplitudeSetProperties'

jest.mock('amplitude-js', () => ({
  getInstance: jest.fn().mockReturnValue({
    setUserProperties: jest.fn()
  })
}))

const state = {
  user: {
    guid: 'guid',
    username: 'username',
    name: 'name',
    schools: [
      {
        id: 'user_school_id',
        name: 'user_school_name',
        roles: ['role']
      }
    ]
  },
  school: {
    value: 'school_value',
    label: 'school_label',
    user_id: 'school_user_id',
    integration_id: 'school_integradion_id',
    roles: ['school_role', 'school_role']
  },
  profiles: [
    {
      id: 'profile_id',
      name: 'profile_name',
      icon: 'profile_icon',
      colorProfile: 'profile_color'
    }
  ],
  name: 'selected_role',
  levels: [{ value: 'EF1', label: 'educational_stage_EF1' }],
  class: 'selected_class',
  level: 'level'
}

jest.mock('react-redux', () => {
  const rest = jest.requireActual('react-redux')
  return {
    ...rest,
    useSelector: jest.fn(() => state)
  }
})

const wrapper: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

describe('testing if amplitude set properties functions work properly', () => {
  const instance = amplitude.getInstance()
  const { setUserProperties } = instance

  it('Should call setUserProperties with the correct informations', async () => {
    const { profiles, user, name, class: selected_class, level, school } = state
    renderHook(() => useAmplitudeSetProperties(), { wrapper })

    expect(setUserProperties).toHaveBeenCalledWith({
      educational_stage_EF1: true,
      educational_stage_EF2: false,
      educational_stage_EI: false,
      educational_stage_EM: false,
      is_admin: false,
      is_coordinator: false,
      is_family: false,
      is_student: false,
      is_teacher: false,
      roles_list: [profiles[0].name],
      schools_list: [user.schools[0].name],
      selectedRole: name,
      selected_class,
      selected_educational_stage: level,
      selected_school_id: school.value,
      selected_school_name: school.label,
      selected_school_sge: null,
      user_id: user.guid,
      user_login: user.username,
      user_name: user.name
    })
  })
})
