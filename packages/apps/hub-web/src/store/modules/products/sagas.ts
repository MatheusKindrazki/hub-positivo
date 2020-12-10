import { all, call, put, takeLatest } from 'redux-saga/effects'

import api, { apiLivro, apiMHUND } from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import { store } from '~/store'

import { loading } from '../global/actions'
import { Actions as ProfileActions } from '../profile/actions'
import { Actions, productSuccess } from './actions'
import { CardProduct } from './types'

export function* getProducts(): Generator {
  yield put(loading(true))

  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

  const { user, school } = store.getState().user

  let query: string

  if (level && guid === 'PROFESSOR') {
    query = `${guid}?NivelEnsino=${level}`
  } else {
    query = `${guid}`
  }

  const response = yield call(() => {
    return api.get(`Categoria/Solucoes/Perfil/${query}`)
  })

  const { ok, data } = response as ApiResponse<CardProduct[]>

  if (!ok) {
    toast.error('Erro ao buscar soluções, tente novamente mais tarde!')
    return
  }

  const apiLivrosResponse = yield call(() => {
    return apiLivro.get(`checkuser?integrationId=${user?.integration_id || 0}`)
  })

  const { data: dataLivros } = apiLivrosResponse as ApiResponse<{
    redirects_to: string
  }>

  const apiMHUNDResponse = yield call(() => {
    return apiMHUND.get(
      `checkschool?integrationId=${school?.integration_id || 0}`
    )
  })

  const { data: dataMHUND } = apiMHUNDResponse as ApiResponse<{
    redirects_to: string
  }>

  const alterData = data?.map(d => {
    return {
      ...d,
      solucoes: d?.solucoes?.map(s => {
        if (s.nome === 'Árvore Livros') {
          return {
            ...s,
            link: dataLivros?.redirects_to || undefined,
            ativo: !!dataLivros?.redirects_to
          }
        } else if (s.nome === 'SAE + C') {
          return {
            ...s,
            link: dataMHUND?.redirects_to || undefined,
            ativo: !!dataMHUND?.redirects_to
          }
        } else return s
      })
    }
  })

  yield put(loading(false))

  yield put(
    productSuccess({
      data: alterData?.map(c => {
        return {
          ...c,
          solucoes: c.solucoes.filter(s => s.ativo)
        }
      })
    })
  )
}

export default all([
  takeLatest(Actions.PRODUCT_REQUEST, getProducts),
  takeLatest(ProfileActions.SET_PROFILE, getProducts)
])
