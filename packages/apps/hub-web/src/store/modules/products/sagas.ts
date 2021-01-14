import { all, call, put, takeLatest } from 'redux-saga/effects'

import api, { apiAuthProduct, apiLivro, apiMHUND } from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import { store } from '~/store'
import { getTourRequest } from '~/store/modules/tour/actions'

import { loading } from '../global/actions'
import { Actions, productSuccess } from './actions'
import { CardProduct } from './types'

export function* getProducts(): Generator {
  yield put(loading(true))

  const enableFilterLevel = ['PROFESSOR', 'ALUNO']

  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

  const auth = store.getState().auth
  const profile = store.getState().profile

  const { user, school } = store.getState().user
  let query: string

  if (!user && !school) return

  if (level && enableFilterLevel.includes(guid)) {
    query = `${guid}?NivelEnsino=${level}`
  } else {
    query = `${guid}`
  }

  const response = yield call(() => {
    return api.get(`Categoria/Solucoes/Perfil/${query}`)
  })

  const { ok, data, status } = response as ApiResponse<CardProduct[]>

  if (!ok && status !== 401) {
    toast.error('Erro ao buscar soluções, tente novamente mais tarde!')
    return
  }

  /* Inicio ( Cod: Temporário ) */
  const authTheProduct = {
    product: 'mhund',
    token: auth.token,
    logged_in: {
      school: {
        name: school?.label,
        id: school?.value,
        class: null
      },
      profile: profile.guid,
      user_id: null
    },
    expire_in: auth.exp
  }

  const responseGUID = yield call(() => {
    return apiAuthProduct.post('api/TokenStorage', authTheProduct)
  })

  const { data: dataGUID } = responseGUID as ApiResponse<object>

  const apiLivrosResponse = yield call(() => {
    return apiLivro.get(`checkuser?integrationId=${user?.integration_id || 0}`)
  })

  const { data: dataLivros } = apiLivrosResponse as ApiResponse<{
    redirects_to: string
  }>

  const apiMHUNDResponse = yield call(() => {
    return apiMHUND.get(`checkuser?guid=${dataGUID || 0}`)
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
            link: dataLivros?.redirects_to || '',
            ativo: !!dataLivros?.redirects_to
          }
        } else if (s.nome === 'Gestão Escolar - Mhund') {
          return {
            ...s,
            link: dataMHUND?.redirects_to || '',
            ativo: !!dataMHUND?.redirects_to
          }
        } else return s
      })
    }
  })

  /* Fim ( Cod: Temporário ) */

  yield put(loading(false))

  yield put(getTourRequest())

  yield put(
    productSuccess({
      data: alterData
        ?.filter(e => e.ativo)
        .map(c => {
          return {
            ...c,
            solucoes: c.solucoes.filter(s => s.ativo)
          }
        })
    })
  )
}

export default all([takeLatest(Actions.PRODUCT_REQUEST, getProducts)])
