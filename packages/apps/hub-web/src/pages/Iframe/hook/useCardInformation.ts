import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { preAuth } from '~/store/modules/authProduct/actions'
import { store } from '~/store'

import createSlug from '@hub/common/utils/createSlug'

import history from '~/services/history'

import { getCardBySlug } from './getCardBySlug'

interface IframePropsRouter {
  solution: string
  subpath: string
}

export default async function useCardInformation(): Promise<void> {
  const dispatch = useDispatch()

  const { solution, subpath } = useParams<IframePropsRouter>()

  const { guid } = store.getState().profile
  const { level } = store.getState().educationalStage

  const card = await getCardBySlug({
    slug: solution,
    nivelEnsino: level,
    perfil: guid
  })
  if (!card) return history.push('/')
  const product = createSlug(card.nome)

  let path = ''
  if (subpath) {
    const queryParams = window.location.hash.split('?')[1] || undefined

    path = `${subpath}${queryParams ? `?${queryParams}` : ''}`
  }

  dispatch(
    preAuth({
      name: card.nome,
      url: card.link || '',
      tipoRenderizacao: card.tipoRenderizacao,
      product: product,
      subpath: path.includes('undefined') ? '' : path
    })
  )
}
