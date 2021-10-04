import { runSaga } from 'redux-saga'

import { getSchools } from '~/store/modules/school/sagas'
import {
  schoolGetAllFailure,
  schoolGetAllSuccess
} from '~/store/modules/school/actions'
import { loading } from '~/store/modules/global/actions'

import { toast } from '@psdhub/common/utils'
import { getInstance } from '@psdhub/api'

import store from '~/__mocks__/fakeStore.mock'

const fakeApiSchoolsResponse = {
  ok: true,
  data: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nome: 'fake category',
      ativo: true
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      nome: 'fake category',
      ativo: false
    }
  ]
}

describe('school sagas work properly', () => {
  let dispatchedActions = store.getActions()

  const spyErrorToast = jest.spyOn(toast, 'error')
  const api = getInstance()
  const spyApiGet = jest
    .spyOn(api, 'get')
    .mockImplementation(() => Promise.resolve<any>(fakeApiSchoolsResponse))

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('should set loading, call api and dispatch success action with correct payload', async () => {
    await runSaga(store, getSchools).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyApiGet).toHaveBeenCalledWith('escola')
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(
      schoolGetAllSuccess(fakeApiSchoolsResponse.data)
    )
  })

  it('should early return when theres no school info', async () => {
    spyApiGet.mockImplementation(() =>
      Promise.resolve<any>({ ok: true, data: undefined })
    )

    await runSaga(store, getSchools).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyApiGet).toHaveBeenCalledWith('escola')
    expect(dispatchedActions).toContainObject(loading(false))
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar lista de escolas cadastradas!'
    )
    expect(dispatchedActions).toContainObject(schoolGetAllFailure())
  })
})
