import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { Profile } from '~/store/modules/profile/types'
import { setProfile } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import * as sagas from '~/store/modules/educationalStage/sagas'
import * as educationalStage from '~/store/modules/educationalStage/actions'

import * as api from '@psdhub/api'

import { userMock, authMock } from '~/__mocks__/store'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('@psdhub/api', () => ({
  ...jest.requireActual('@psdhub/api'),
  getInstance: jest.fn()
}))

let dispatchedActions = store.getActions()

describe('Sagas of educationalStage history', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  describe('get Education Stage', () => {
    it('Should generate a new user authentication token for the user', async () => {
      mockState.auth = {
        ...mockState.auth,
        reduced_token: authMock.reduced_token
      }

      mockState.user = {
        ...mockState.user,
        info: userMock.user
      }

      const returnedMock = {
        ok: true,
        originalError: null,
        problem: null,
        data: [
          {
            value: 'EM',
            label: 'Ensino Médio',
            turmas: [
              {
                nomeTurma: '3º Ano - A',
                nomeSerie: '3º Ano',
                turmaValida: true
              }
            ]
          }
        ]
      }

      const mockedGet = jest.fn(() => returnedMock)

      jest
        .spyOn(api, 'getInstance')
        .mockImplementation(() => ({ get: mockedGet } as any))

      await runSaga(store, sagas.getEducationStage).toPromise()

      expect(dispatchedActions).toContainObject(
        educationalStage.setEducationalLevels({
          levels: [
            {
              label: 'Ensino Médio',
              value: 'EM',
              series: [{ valid: true, name: '3º Ano - A', class: '3º Ano' }]
            }
          ],
          level: 'EM',
          class: '3º Ano - A'
        })
      )
    })

    it('Should return empty if the API returns an error', async () => {
      mockState.auth = {
        ...mockState.auth,
        reduced_token: authMock.reduced_token
      }

      mockState.user = {
        ...mockState.user,
        info: userMock.user
      }

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: {}
      }

      const mockedGet = jest.fn(() => returnedMock)

      jest
        .spyOn(api, 'getInstance')
        .mockImplementation(() => ({ get: mockedGet } as any))

      const resolved = await runSaga(store, sagas.getEducationStage).result()

      expect(resolved).toBeUndefined()
    })
  })

  describe('get Educational By Person', () => {
    it('Should shoot the saga to seek the levels of teaching', async () => {
      mockState.auth = {
        ...mockState.auth,
        reduced_token: authMock.reduced_token
      }

      mockState.user = {
        ...mockState.user,
        info: userMock.user
      }

      const returnedMock = {
        ok: false,
        originalError: null,
        problem: null,
        data: {}
      }

      const mockedGet = jest.fn(() => returnedMock)

      jest
        .spyOn(api, 'getInstance')
        .mockImplementation(() => ({ get: mockedGet } as any))

      const mockedAction = setProfile({
        colorProfile: 'green',
        guid: 'fake-id',
        name: 'Professor',
        profile: 'professor'
      }) as Payload<Profile>

      await runSaga(
        store,
        sagas.getEducationalByPerson,
        mockedAction
      ).toPromise()

      expect(dispatchedActions).toContainObject(productRequest({}))
    })

    it('Should reset the profile selection if the selected profile is different from expected', async () => {
      const mockedAction = setProfile({
        colorProfile: 'green',
        guid: 'fake-id',
        name: 'Administrador',
        profile: 'administrador'
      }) as Payload<Profile>

      await runSaga(
        store,
        sagas.getEducationalByPerson,
        mockedAction
      ).toPromise()

      expect(dispatchedActions).toContainObject(
        educationalStage.resetProfileLevels()
      )
    })
  })
})
