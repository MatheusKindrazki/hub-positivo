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
  if (process.env.REACT_APP_INTEGRATION) {
    const mocked = {
      id: '5dc527c2-60cb-4946-9f04-0469949ae947',
      nome: 'Páprica Integração',
      descricao: 'Integração com as soluções',
      arquivo:
        'https://sthubdigitalassetsdev001.blob.core.windows.net/imagenscards/19b493149c9a49a58ef6f487c09c3eb1%23simulados.svg',
      link: 'http://positivo.paprica.ag/auth?guid=',
      integration_type: 'wordpress',
      ativo: true
    }
    const dataMock = data?.map(i => {
      if (i.nome === 'Avaliação') {
        return {
          ...i,
          solucoes: [mocked, ...i.solucoes]
        }
      }

      return i
    })

    return yield yield put(
      productSuccess({
        data: dataMock as CardProduct[]
      })
    )
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
