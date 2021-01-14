import { all, call, put, takeLatest } from 'redux-saga/effects'

import api from '@hub/api'
import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'

import { store } from '~/store'
import { getTourRequest } from '~/store/modules/tour/actions'

import { loading } from '../global/actions'
import { Actions, productSuccess } from './actions'
import { CardProduct, CardProps } from './types'

export function* getProducts(): Generator {
  yield put(loading(true))

  const enableFilterLevel = ['PROFESSOR', 'ALUNO']

  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

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

  const cardName = {
    'Árvore Livros': 'apisae',
    'Gestão Escolar - Mhund': 'mhund'
  }

  const alterData = data?.filter(e =>
    e.solucoes.filter(s => {
      if (cardName[s.nome as CardProps]) {
        return { ...s, type: cardName[s.nome as CardProps] }
      }
      return s
    })
  )

  yield put(loading(false))

  yield put(getTourRequest())

  return yield put(
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
