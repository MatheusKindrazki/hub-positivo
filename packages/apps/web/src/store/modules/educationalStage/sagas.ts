import { unionBy } from 'lodash'
import { ApiResponse } from 'apisauce'

import { all, put, Payload, takeLatest, call } from 'redux-saga/effects'

import { Profile } from '~/store/modules/profile/types'
import { Actions } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { store } from '~/store'

import prepareEducational, {
  ContentResponse
} from '@psdhub/common/utils/prepareEducationalStage'

import { EEMConnectGET } from '~/services/eemConnect'

import { resetProfileLevels, setEducationalLevels } from './actions'

const searchLevels = ['professor', 'aluno']

interface SendInfo {
  usuarioId: string
}

export function* getEducationStage(): Generator {
  const { school } = store.getState().user
  const { reduced_token } = store.getState().auth

  const response = yield call(() => {
    return EEMConnectGET<SendInfo>({
      endpoint: '/v1/Academico/turmas',
      token: reduced_token as string,
      data: {
        usuarioId: school?.user_id as string
      }
    })
  })

  const { ok, data } = response as ApiResponse<{ conteudo: ContentResponse[] }>

  if (!ok) return

  const { levels, selected } = prepareEducational(data?.conteudo)

  console.log('brasil', levels[0])

  const userSingleClass = data?.conteudo.find(e => e.ativo)?.serie.nome

  return yield put(
    setEducationalLevels({
      levels: unionBy(levels, 'value'),
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
