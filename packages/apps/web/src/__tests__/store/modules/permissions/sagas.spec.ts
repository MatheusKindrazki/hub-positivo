import { runSaga } from 'redux-saga'

import {
  ProfilePermissions,
  Restricao,
  SchoolPermissions
} from '~/store/modules/permissions/types'
import {
  getAllProfilePermissions,
  getProfilePermissionsBySolutionId,
  getSchoolPermissionsBySolutionId,
  profilePermissions,
  schoolPermissions
} from '~/store/modules/permissions/sagas'
import {
  profilePermissionsRequest,
  profilePermissionsSuccess,
  profilePermissionsFailure,
  schoolPermissionsRequest,
  schoolPermissionsSuccess,
  schoolPermissionsFailure,
  schoolPermissionsBySolutionRequest,
  schoolPermissionsBySolutionFailure,
  schoolPermissionsBySolutionSuccess,
  profilePermissionsBySolutionRequest,
  profilePermissionsBySolutionFailure,
  profilePermissionsBySolutionSuccess,
  getAllProfilePermissionsFailure,
  getAllProfilePermissionsSuccess
} from '~/store/modules/permissions/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import store from '~/__mocks__/fakeStore.mock'

const allProfilePermissions = {
  success: {
    ok: true,
    data: [
      {
        perfil: 'administrador',
        nivelEnsino: null,
        id: 'fake profile id'
      }
    ]
  },
  error: {
    ok: false,
    data: null
  }
}

const profileLevelsBySolution = {
  success: {
    ok: true,
    data: [
      {
        id: 'fake profile id',
        idSolucao: 'fake solution id',
        idPerfilNivelEnsino: 'fake profile level id'
      }
    ]
  },
  error: {
    ok: false,
    data: null
  }
}

const schoolRestrictionsBySolution = {
  success: {
    ok: true,
    data: [
      {
        id: 'string',
        idSolucao: 'string',
        nomeSolucao: 'string',
        idEscola: 'string',
        nomeEscola: 'string',
        restricao: 'Ocultar' as Restricao,
        ativo: true
      }
    ]
  },
  error: {
    ok: false,
    data: null
  }
}

describe('permissions sagas work properly', () => {
  let dispatchedActions = store.getActions()

  const spyErrorToast = jest.spyOn(toast, 'error')

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })

  it('getAllProfilePermissions should call api and dispatch success action', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(allProfilePermissions.success)
      )

    await runSaga(store, getAllProfilePermissions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('perfilNivelEnsino')
    expect(dispatchedActions).toContainObject(
      getAllProfilePermissionsSuccess(allProfilePermissions.success.data)
    )
  })
  it('getAllProfilePermissions should call toast error and dispatch failure action when api returns with an error', async () => {
    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(allProfilePermissions.error)
      )

    await runSaga(store, getAllProfilePermissions).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('perfilNivelEnsino')
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar permissoes de perfil!'
    )
    expect(dispatchedActions).toContainObject(getAllProfilePermissionsFailure())
  })

  it('getProfilePermissionsBySolutionId should call api and dispatch success action', async () => {
    const solutionId = 'fake solution id'

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(profileLevelsBySolution.success)
      )

    await runSaga(
      store,
      getProfilePermissionsBySolutionId,
      profilePermissionsBySolutionRequest(solutionId)
    ).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('solucaoPerfilNivelEnsino', {
      idSolucao: solutionId
    })
    expect(dispatchedActions).toContainObject(
      profilePermissionsBySolutionSuccess(profileLevelsBySolution.success.data)
    )
  })
  it('getProfilePermissionsBySolutionId should call toast error and dispatch failure action when api returns with an error', async () => {
    const solutionId = 'fake solution id'

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(profileLevelsBySolution.error)
      )

    await runSaga(
      store,
      getProfilePermissionsBySolutionId,
      profilePermissionsBySolutionRequest(solutionId)
    ).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('solucaoPerfilNivelEnsino', {
      idSolucao: solutionId
    })
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar restrições de perfil desta solução'
    )
    expect(dispatchedActions).toContainObject(
      profilePermissionsBySolutionFailure()
    )
  })

  it('getSchoolPermissionsBySolutionId should call api and dispatch success action', async () => {
    const solutionId = 'fake solution id'

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(schoolRestrictionsBySolution.success)
      )

    await runSaga(
      store,
      getSchoolPermissionsBySolutionId,
      schoolPermissionsBySolutionRequest(solutionId)
    ).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('solucao/restricao', {
      idSolucao: solutionId
    })
    expect(dispatchedActions).toContainObject(
      schoolPermissionsBySolutionSuccess(
        schoolRestrictionsBySolution.success.data
      )
    )
  })
  it('getSchoolPermissionsBySolutionId should call toast error and dispatch failure action when api returns with an error', async () => {
    const solutionId = 'fake solution id'

    const spyApiGet = jest
      .spyOn(api, 'get')
      .mockImplementation(() =>
        Promise.resolve<any>(schoolRestrictionsBySolution.error)
      )

    await runSaga(
      store,
      getSchoolPermissionsBySolutionId,
      schoolPermissionsBySolutionRequest(solutionId)
    ).toPromise()

    expect(spyApiGet).toHaveBeenCalledWith('solucao/restricao', {
      idSolucao: solutionId
    })
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao buscar permissões de escola para esta solucao'
    )
    expect(dispatchedActions).toContainObject(
      schoolPermissionsBySolutionFailure()
    )
  })

  it('profilePermissions should delete old profile permissions and post current ones', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 3', 'fake id 4']
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(mockedProfilePermissions)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucaoPerfilNivelEnsino',
      {},
      { data: mockedProfilePermissions.remove }
    )
    expect(spyApiPost).toHaveBeenCalledWith('solucaoPerfilNivelEnsino', {
      ...mockedProfilePermissions.create
    })
    expect(dispatchedActions).toContainObject(profilePermissionsSuccess())
  })

  it('profilePermissions shouldnt make any delete requests, when no removal permissions are provided', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: null
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2']
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    const spyApiDel = jest.spyOn(api, 'delete')

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedProfilePermissions as unknown as ProfilePermissions
      )
    ).toPromise()

    expect(spyApiDel).not.toHaveBeenCalled()
    expect(spyApiPost).toHaveBeenCalledWith('solucaoPerfilNivelEnsino', {
      ...mockedProfilePermissions.create
    })
    expect(dispatchedActions).toContainObject(profilePermissionsSuccess())
  })

  it('profilePermissions should send a delete request and shouldnt send any post requests when no create permissions are provided', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: null
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedProfilePermissions as unknown as ProfilePermissions
      )
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucaoPerfilNivelEnsino',
      {},
      { data: mockedProfilePermissions.remove }
    )
    expect(spyApiPost).not.toHaveBeenCalled()
    expect(dispatchedActions).toContainObject(profilePermissionsSuccess())
  })

  it('profilePermissions shouldnt make any requests, call error toast and dispatch failure action when no profiles are provided', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: null
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: null
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest.spyOn(api, 'delete')

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedProfilePermissions as unknown as ProfilePermissions
      )
    ).toPromise()

    expect(spyApiDel).not.toHaveBeenCalled()
    expect(spyApiPost).not.toHaveBeenCalled()
  })

  it('profilePermissions should call toast error and dispatch failure action and early return when delete request returns with an error', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 3', 'fake id 4']
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: false }))

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(mockedProfilePermissions)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucaoPerfilNivelEnsino',
      {},
      { data: mockedProfilePermissions.remove }
    )

    expect(spyApiPost).not.toHaveBeenCalled()
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao atualizar permissões de perfil'
    )
    expect(dispatchedActions).toContainObject(profilePermissionsFailure())
  })

  it('profilePermissions should call toast error and dispatch failure action when post request returns with an error', async () => {
    const mockedProfilePermissions = {
      remove: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        IdsPerfisNiveisEnsino: ['fake id 3', 'fake id 4']
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: false }))

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      profilePermissions,
      profilePermissionsRequest(mockedProfilePermissions)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucaoPerfilNivelEnsino',
      {},
      { data: mockedProfilePermissions.remove }
    )

    expect(spyApiPost).toHaveBeenCalledWith('solucaoPerfilNivelEnsino', {
      ...mockedProfilePermissions.create
    })
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Erro ao atualizar permissões de perfil'
    )
    expect(dispatchedActions).toContainObject(profilePermissionsFailure())
  })

  it('schoolPermissions should delete old permissions and post current ones', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 3', 'fake id 4'],
        restricao: 'Ocultar' as Restricao
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(mockedSchoolPermissions)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucao/Restricao',
      {},
      { data: mockedSchoolPermissions.remove }
    )
    expect(spyApiPost).toHaveBeenCalledWith('solucao/restricao', {
      ...mockedSchoolPermissions.create
    })
    expect(dispatchedActions).toContainObject(schoolPermissionsSuccess())
  })
  it('schoolPermissions shouldnt make any delete requests, when no removal permissions are provided', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: null
      },
      create: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 1', 'fake id 2'],
        restricao: 'Ocultar' as Restricao
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    const spyApiDel = jest.spyOn(api, 'delete')

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedSchoolPermissions as unknown as SchoolPermissions
      )
    ).toPromise()

    expect(spyApiDel).not.toHaveBeenCalled()
    expect(spyApiPost).toHaveBeenCalledWith('solucao/restricao', {
      ...mockedSchoolPermissions.create
    })
    expect(dispatchedActions).toContainObject(schoolPermissionsSuccess())
  })
  it('schoolPermissions should send a delete request and shouldnt send any post requests when no create permissions are provided', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 1', 'fake id 2']
      },
      create: {
        idEscolas: 'fake solution id',
        idsEscolas: null
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedSchoolPermissions as unknown as SchoolPermissions
      )
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucao/Restricao',
      {},
      { data: mockedSchoolPermissions.remove }
    )
    expect(spyApiPost).not.toHaveBeenCalled()
    expect(dispatchedActions).toContainObject(schoolPermissionsSuccess())
  })
  it('SchoolPermissions should call toast error and dispatch failure action and early return when delete request returns with an error', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        idsEscolas: null
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: false }))

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(
        mockedSchoolPermissions as unknown as SchoolPermissions
      )
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucao/Restricao',
      {},
      { data: mockedSchoolPermissions.remove }
    )

    expect(spyApiPost).not.toHaveBeenCalled()
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Algo deu errado no momento de atualizar permissões'
    )
    expect(dispatchedActions).toContainObject(schoolPermissionsFailure())
  })
  it('SchoolPermissions should call toast error and dispatch failure action when post request returns with an error', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 1', 'fake id 2']
      },
      create: {
        idSolucao: 'fake solution id',
        idsEscolas: ['fake id 3', 'fake id 4'],
        restricao: 'Ocultar' as Restricao
      }
    }

    const spyApiPost = jest
      .spyOn(api, 'post')
      .mockImplementation(() => Promise.resolve<any>({ ok: false }))

    const spyApiDel = jest
      .spyOn(api, 'delete')
      .mockImplementation(() => Promise.resolve<any>({ ok: true }))

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(mockedSchoolPermissions)
    ).toPromise()

    expect(spyApiDel).toHaveBeenCalledWith(
      'solucao/Restricao',
      {},
      { data: mockedSchoolPermissions.remove }
    )

    expect(spyApiPost).toHaveBeenCalledWith('solucao/restricao', {
      ...mockedSchoolPermissions.create
    })
    expect(spyErrorToast).toHaveBeenCalledWith(
      'Algo deu errado no momento de atualizar restrições'
    )
    expect(dispatchedActions).toContainObject(schoolPermissionsFailure())
  })
  it('SchoolPermissions shouldnt make any requests, call error toast and dispatch failure action when no profiles are provided', async () => {
    const mockedSchoolPermissions = {
      remove: {
        idSolucao: 'fake solution id',
        idsEscolas: null
      },
      create: {
        idSolucao: 'fake solution id',
        idsEscolas: null,
        restricao: 'Ocultar' as Restricao
      }
    }

    const spyApiPost = jest.spyOn(api, 'post')

    const spyApiDel = jest.spyOn(api, 'delete')

    await runSaga(
      store,
      schoolPermissions,
      schoolPermissionsRequest(
        // convertendo para unknown para passar idsPerfisNiveisEnsino como null
        mockedSchoolPermissions as unknown as SchoolPermissions
      )
    ).toPromise()

    expect(spyApiDel).not.toHaveBeenCalled()
    expect(spyApiPost).not.toHaveBeenCalled()
  })
})
