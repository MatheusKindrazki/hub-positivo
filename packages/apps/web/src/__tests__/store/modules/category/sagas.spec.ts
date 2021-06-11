import { Payload } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'

import { loading } from '~/store/modules/global/actions'
import { CategoryPostData } from '~/store/modules/category/types'
import { createCategory, getCategories } from '~/store/modules/category/sagas'
import {
  categoryPostFailure,
  categoryPostSuccess,
  categoryGetAllFailure,
  categoryGetAllSuccess,
  categoryPostRequest
} from '~/store/modules/category/actions'

import { toast } from '@psdhub/common/utils'
import api from '@psdhub/api'

import store from '~/__mocks__/fakeStore.mock'
import fakeApiCategoryResponse from '~/__mocks__/api/fakeApiCategoryResponse.json'

describe('category sagas work properly', () => {
  let dispatchedActions = store.getActions()

  const mockedApiPostResponse = {
    success: {
      ok: true,
      data: {
        sucesso: true,
        mensagem: 'categoria criada com sucesso'
      }
    },
    error: {
      ok: false,
      data: {
        sucesso: false,
        mensagem: 'erro ao criar categoria'
      }
    }
  }

  const spySuccessToast = jest.spyOn(toast, 'success')

  const spyErrorToast = jest.spyOn(toast, 'error')

  const spyApiPost = jest
    .spyOn(api, 'post')
    .mockImplementation(() =>
      Promise.resolve<any>(mockedApiPostResponse.success)
    )

  const spyApiGet = jest
    .spyOn(api, 'get')
    .mockImplementation(() => Promise.resolve<any>(fakeApiCategoryResponse))

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    store.clearActions()

    dispatchedActions = store.getActions()
  })
  it('should call api, call success toast and dispatch success action', async () => {
    const category = { nome: 'fake category' }

    await runSaga(
      store,
      createCategory,
      categoryPostRequest(category) as Payload<CategoryPostData>
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith('/categoria', category)
    expect(spySuccessToast).toHaveBeenCalledWith('Categoria criada com sucesso')
    expect(dispatchedActions).toContainObject(categoryPostSuccess())
  })

  it('should call toast error when api returns with an error', async () => {
    const category = { nome: 'fake category' }

    spyApiPost.mockImplementation(() =>
      Promise.resolve<any>(mockedApiPostResponse.error)
    )

    await runSaga(
      store,
      createCategory,
      categoryPostRequest(category) as Payload<CategoryPostData>
    ).toPromise()

    expect(spyApiPost).toHaveBeenCalledWith('/categoria', category)
    expect(spyErrorToast).toHaveBeenCalledWith('Erro ao criar categoria')
    expect(dispatchedActions).toContainObject(categoryPostFailure())
  })

  it('should dispatch a withoutAccess action and early return a user without the correct level', async () => {
    await runSaga(store, getCategories).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyApiGet).toHaveBeenCalledWith('categoria')
    expect(dispatchedActions).toContainObject(loading(false))
    expect(dispatchedActions).toContainObject(
      categoryGetAllSuccess(fakeApiCategoryResponse.data)
    )
  })

  it('should early return when theres no user or school info', async () => {
    spyApiGet.mockImplementation(() =>
      Promise.resolve<any>({ ok: true, data: undefined })
    )

    await runSaga(store, getCategories).toPromise()

    expect(dispatchedActions).toContainObject(loading(true))
    expect(spyApiGet).toHaveBeenCalledWith('categoria')
    expect(dispatchedActions).toContainObject(loading(false))
    expect(spyErrorToast).toHaveBeenCalledWith('Erro ao buscar as categorias!')
    expect(dispatchedActions).toContainObject(categoryGetAllFailure())
  })
})
