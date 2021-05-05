import { useParams } from 'react-router-dom'

import { preAuth } from '~/store/modules/authProduct/actions'
import { store } from '~/store'

import createSlug from '@psdhub/common/utils/createSlug'
import { delay } from '@psdhub/common/utils'

import history from '~/services/history'
import { getCardBySlug } from '~/services/getCardBySlug'

interface IframePropsRouter {
  solution: string
  subpath: string
}

const searchLevels = ['PROFESSOR', 'ALUNO']

async function getEducationalStage(): Promise<string> {
  const { level } = store.getState().educationalStage

  await delay(500)

  if (!level) {
    return await getEducationalStage()
  }

  return level
}

export default async function useCardInformation(): Promise<void> {
  const { solution, subpath } = useParams<IframePropsRouter>()

  const { guid } = store.getState().profile
  let level = ''

  if (searchLevels.includes(guid)) {
    level = await getEducationalStage()
  }

  const card = await getCardBySlug({
    slug: solution,
    nivelEnsino: level,
    perfil: guid
  })

  if (!card) return history.push('/')
  const product = createSlug(card.nome)

  let path = ''
  if (subpath) {
    const queryParams = window.location.hash.split('?')[1] || ''

    path = `${subpath}${queryParams}`
  }

  store.dispatch(
    preAuth({
      name: card.nome,
      url: card.link || '',
      tipoRenderizacao: card.tipoRenderizacao,
      product: product,
      subpath: path.includes('undefined') ? '' : path
    })
  )
}
