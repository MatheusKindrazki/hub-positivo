import { all, call, Payload, put, takeLatest } from 'redux-saga/effects'

import api from '@hub/api'

import { ApiResponse } from 'apisauce'
import { toast } from 'react-toastify'

import { store } from '~/store'

import { Actions as ProfileActions } from '../profile/actions'
import { Actions, productSuccess } from './actions'
import { CardProduct } from './types'

export function* getProducts(): Generator {
  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

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

  yield put(
    productSuccess({
      data
    })
  )
}

export default all([
  takeLatest(Actions.PRODUCT_REQUEST, getProducts),
  takeLatest(ProfileActions.SET_PROFILE, getProducts)
])
