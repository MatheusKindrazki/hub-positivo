import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { Profile } from '~/store/modules/profile/types'
import { setProfile } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import * as sagas from '~/store/modules/educationalStage/sagas'
import * as educationalStage from '~/store/modules/educationalStage/actions'

import * as eem from '~/services/eemConnect'

import { userMock, authMock } from '~/__mocks__/store'
import store, { mockState } from '~/__mocks__/fakeStore.mock'

jest.mock('~/services/eemConnect')
jest.mock('@psdhub/common/utils/prepareEducationalStage', () =>
  jest.fn().mockImplementation(() => ({
    levels: [{ label: 'EF1', value: 'EF1' }],
    selected: 'EF1'
  }))
)

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
        data: {
          conteudo: [
            {
              ativo: true,
              serie: {
                nome: 'Minha serie'
              }
            }
          ]
        }
      }

      jest
        .spyOn(eem, 'EEMConnectGET')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

      await runSaga(store, sagas.getEducationStage).toPromise()

      expect(dispatchedActions).toContainObject(
        educationalStage.setEducationalLevels({
          levels: [{ label: 'EF1', value: 'EF1' }],
          level: 'EF1',
          class: 'Minha serie'
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

      jest
        .spyOn(eem, 'EEMConnectGET')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

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

      jest
        .spyOn(eem, 'EEMConnectGET')
        .mockImplementationOnce(() => Promise.resolve<any>(returnedMock))

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
