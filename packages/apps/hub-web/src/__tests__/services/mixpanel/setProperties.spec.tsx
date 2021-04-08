/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable prettier/prettier */
import React from 'react'

import mixpanel from 'mixpanel-browser'
import { renderHook } from '@testing-library/react-hooks'

import { Provider } from 'react-redux'

import setProperties from '~/services/mixpanel/setProperties'

import { userMock, profilesMock, educationalStageMock } from '~/__mocks__/store'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('mixpanel-browser', () => ({
  people: {
    set: jest.fn()
  },
  identify: jest.fn()
}))

const wrapper: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

describe('Mixpanel Services', () => {
  it('Should return false if the user is not logged in', () => {
    let resolved: any

    renderHook(() => (resolved = setProperties()), { wrapper })

    expect(resolved).toBeUndefined()
  })

  it('Should prepare user information for sending MixPanel', () => {
    mockState.auth = {
      ...mockState.auth,
      signed: true
    }

    mockState.user = {
      ...mockState.user,
      info: userMock.user,
      school: userMock.school
    }

    mockState.profile = {
      ...profilesMock
    }

    mockState.educationalStage = {
      ...educationalStageMock,
      loading: false
    }

    const mockSetPeople = jest.spyOn(mixpanel.people, 'set')

    renderHook(() => setProperties(), { wrapper })

    expect(mockSetPeople).toBeCalledWith({
      is_teacher: true,
      is_student: false,
      is_coordinator: true,
      is_admin: true,
      is_family: true,
      educational_stage_EI: false,
      educational_stage_EF1: true,
      educational_stage_EF2: true,
      educational_stage_EM: true,
      selected_class: '1º ano',
      selected_educational_stage: 'EF1',
      user_id: '6d45f4f8-3326-4856-a29d-36216b2e4e2c',
      user_login: 'john.doe',
      $name: 'John Doe',
      user_name: 'John Doe',
      user_mail: 'johndoe@teste.com',
      selected_role: 'Professor',
      roles_list: ['Administrador', 'Coordenador', 'Família', 'Professor'],
      selected_school_id: '21694ec0-88be-4231-ac2a-392dbf845518',
      selected_school_name: 'Escola Positivo',
      schools_list: ['Escola Positivo']
    })
  })

  it('Show an error in the console if MixPanel is not instantiated', () => {
    const mockLog = jest.fn()

    Object.assign(console, {
      error: mockLog
    })

    jest.spyOn(mixpanel.people, 'set').mockImplementation(() => {
      throw new Error('Erro')
    })

    renderHook(() => setProperties(), { wrapper })

    expect(mockLog).toBeCalledWith('Erro ao identificar usuário via mixpanel')
  })

  it.skip('should properly set gsc properties', () => {
    // mock do modulo do Get Site Control
    window.gsc = jest.fn()

    const mockedProps = {
      educationalStage: 'EF1',
      name: 'John Doe',
      role: 'Professor',
      school: 'Escola Positivo',
      $name: 'John Doe',
      educational_stage_EF1: true,
      educational_stage_EF2: true,
      educational_stage_EI: false,
      educational_stage_EM: true,
      is_admin: true,
      is_coordinator: true,
      is_family: true,
      is_student: false,
      is_teacher: true,
      roles_list: ['Administrador', 'Coordenador', 'Família', 'Professor'],
      schools_list: ['Escola Positivo'],
      selected_class: '1º ano',
      selected_educational_stage: 'EF1',
      selected_role: 'Professor',
      selected_school_id: '21694ec0-88be-4231-ac2a-392dbf845518',
      selected_school_name: 'Escola Positivo',
      user_id: '6d45f4f8-3326-4856-a29d-36216b2e4e2c',
      user_login: 'john.doe',
      user_mail: 'johndoe@teste.com',
      user_name: 'John Doe'
    }

    renderHook(() => setProperties(), { wrapper })

    const gscSpy = jest.spyOn(window, 'gsc')
    expect(gscSpy).toHaveBeenCalledWith('params', mockedProps)
  })
})
