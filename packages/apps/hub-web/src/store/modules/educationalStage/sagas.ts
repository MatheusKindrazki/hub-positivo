import { ApiResponse } from 'apisauce'

import { all, put, Payload, takeLatest, call } from 'redux-saga/effects'

import { Profile } from '~/store/modules/profile/types'
import { Actions } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { store } from '~/store'

import api from '@hub/api'

import { ContentResponse } from './types'
import { resetProfileLevels, setEducationalLevels } from './actions'

const searchLevels = ['professor', 'aluno']

function* getEducationStage(): Generator {
  const { school } = store.getState().user
  const { reduced_token } = store.getState().auth

  const response = yield call(async () => {
    return await api.get(
      'NivelEnsino',
      {
        usuarioId: school?.user_id as string
      },
      {
        headers: {
          Authorization: `Bearer ${reduced_token as string}`
        }
      }
    )
  })

  const { ok, data } = response as ApiResponse<ContentResponse[]>

  if (!ok) return

  const ciclos = data as ContentResponse[]

  return yield put(
    setEducationalLevels({
      levels: ciclos,
      level: ciclos.length ? ciclos[0].value : ''
    })
  )
}

export function* getEducationalByPerson({
  payload
}: Payload<Profile>): Generator {
  const { profile } = payload

  if (!searchLevels.includes(profile)) {
    yield put(resetProfileLevels())

    return yield put(productRequest({}))
  }

  yield getEducationStage()

  return yield put(productRequest({}))
}

export default all([takeLatest(Actions.SET_PROFILE, getEducationalByPerson)])
