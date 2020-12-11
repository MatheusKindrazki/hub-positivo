import { all, put, call, Payload, takeLatest } from 'redux-saga/effects'

import _ from 'lodash'

import { EEMConnectGET } from '~/services/eemConnect'
import { store } from '~/store'
import { Actions } from '~/store/modules/profile/actions'
import { Profile } from '~/store/modules/profile/types'

import { resetProfileLevels, setProfileLevels } from './actions'
import mock from './mock.json'

export function* getLevelByProfile({ payload }: Payload<Profile>): Generator {
  const { profile } = payload

  const searchLevels = ['professor', 'aluno']

  if (!searchLevels.includes(profile)) {
    return yield put(resetProfileLevels())
  }

  // interface SendInfo {
  //   usuarioId: string
  // }
  // const { school } = store.getState().user
  // const { token } = store.getState().auth

  // const response = yield call(() => {
  //   return EEMConnectGET<SendInfo>({
  //     endpoint: '/v1/Academico/turmas',
  //     token: token || '',
  //     data: {
  //       usuarioId: school?.user_id || ''
  //     }
  //   })
  // })

  // console.log(response)

  interface Ciclos {
    id: number
    label: string
    value: string
  }

  const ciclos = [] as Ciclos[]

  let selectedCiclo = {} as Ciclos
  let setDefaultCiclo = false

  mock.conteudo.forEach(e => {
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

  const uniByCiclo = _.unionBy(ciclos, 'id')

  return yield put(
    setProfileLevels({
      levels: uniByCiclo,
      level: selectedCiclo.label
    })
  )
}

export default all([takeLatest(Actions.SET_PROFILE, getLevelByProfile)])
