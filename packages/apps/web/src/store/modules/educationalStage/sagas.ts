import { ApiResponse } from 'apisauce'

import { all, put, Payload, takeLatest, call } from 'redux-saga/effects'

import { Profile } from '~/store/modules/profile/types'
import { Actions } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { store } from '~/store'

import { getInstance } from '@psdhub/api'

import prepareEducational, {
  ContentResponse
} from '~/utils/prepareEducationalStage'

import { resetProfileLevels, setEducationalLevels } from './actions'

const searchLevels = ['professor', 'aluno']

interface SendInfo {
  usuarioId: string
}
export function* getEducationStage(): Generator {
  const { school } = store.getState().user

  const api = getInstance('default')

  const response = yield call(async () => {
    return api.get<SendInfo>('/NivelEnsino', {
      usuarioId: school?.user_id
    })
  })
  const { ok, data } = response as ApiResponse<ContentResponse[]>

  if (!ok || !data) return

  const { selected, levels } = prepareEducational(data)

  const userSingleClass = levels
    .find(level => level.series.find(serie => serie.valid))
    ?.series.find(serie => serie.valid)?.name

  return yield put(
    setEducationalLevels({
      levels: levels,
      level: selected,
      class: userSingleClass
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
