import { all, put, Payload, takeLatest, call } from 'redux-saga/effects'

import { toast } from '@hub/common/utils'

import { ApiResponse } from 'apisauce'
import { unionBy } from 'lodash'

import { EEMConnectGET } from '~/services/eemConnect'
import { store } from '~/store'
import { productRequest } from '~/store/modules/products/actions'
import { Actions } from '~/store/modules/profile/actions'
import { Profile } from '~/store/modules/profile/types'

import { resetProfileLevels, setProfileLevels } from './actions'
import { Ciclos, ContentResponse } from './types'

export function* getLevelByProfile({ payload }: Payload<Profile>): Generator {
  const { profile } = payload

  const searchLevels = ['professor', 'aluno']

  if (!searchLevels.includes(profile)) {
    yield put(resetProfileLevels())

    return yield put(productRequest({}))
  }

  interface SendInfo {
    usuarioId: string
  }

  const { school } = store.getState().user
  const { token } = store.getState().auth

  const response = yield call(() => {
    return EEMConnectGET<SendInfo>({
      endpoint: '/v1/Academico/turmas',
      token: token || '',
      data: {
        usuarioId: school?.user_id || ''
      }
    })
  })

  const { ok, data } = response as ApiResponse<{
    conteudo: ContentResponse[]
  }>

  if (!ok) {
    toast.error('Ocorreu um erro ao buscar seu Perfil!')

    return
  }

  const ciclos = [] as Ciclos[]

  let selectedCiclo = {} as Ciclos
  let setDefaultCiclo = false

  data?.conteudo.forEach(e => {
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
  })

  const uniByCiclo = unionBy(ciclos, 'id')

  yield put(
    setProfileLevels({
      levels: uniByCiclo,
      level: selectedCiclo.label
    })
  )

  return yield put(productRequest({}))
}

export default all([takeLatest(Actions.SET_PROFILE, getLevelByProfile)])
