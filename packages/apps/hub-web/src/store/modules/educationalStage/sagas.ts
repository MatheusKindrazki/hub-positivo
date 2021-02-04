import { unionBy } from 'lodash'
import { ApiResponse } from 'apisauce'

import { all, put, Payload, takeLatest, call } from 'redux-saga/effects'

import { Profile } from '~/store/modules/profile/types'
import { Actions } from '~/store/modules/profile/actions'
import { productRequest } from '~/store/modules/products/actions'
import { store } from '~/store'

import { EEMConnectGET } from '~/services/eemConnect'

import { Ciclos, ContentResponse } from './types'
import { resetProfileLevels, setEducationalLevels } from './actions'

const searchLevels = ['professor', 'aluno']

function* getEducationStage(): Generator {
  interface SendInfo {
    usuarioId: string
  }

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

  const { ok, data } = response as ApiResponse<{
    conteudo: ContentResponse[]
  }>

  if (!ok) return

  const ciclos = [] as Ciclos[]

  let selectedCiclo = {} as Ciclos
  let setDefaultCiclo = false

  data?.conteudo.forEach(e => {
    if (e.ativo) {
      if (!setDefaultCiclo && !!e.serie.ciclo) {
        selectedCiclo = {
          id: e.serie.ciclo.id,
          label: e.serie.ciclo.descricao,
          value: e.serie.ciclo.descricao
        }

        setDefaultCiclo = true
      }

      ciclos.push({
        id: e.serie.ciclo.id,
        label: e.serie.ciclo.descricao,
        value: e.serie.ciclo.descricao
      })
    }
  })

  const uniByCiclo = unionBy(ciclos, 'id')

  return yield put(
    setEducationalLevels({
      levels: uniByCiclo,
      level: selectedCiclo.label
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
