import React, { useEffect, useState } from 'react'

import { PulseLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { preAuth } from '~/store/modules/authProduct/actions'
import { store } from '~/store'

import documentTitle from '@hub/common/utils/documentTitle'
import createSlug from '@hub/common/utils/createSlug'
import { useTheme } from '@hub/common/layout/styles'

import history from '~/services/history'

import postMessage from '~/middlewares/postMessage'

import { IframeContainer } from './styles'
import { getCardBySlug } from './services/getCardBySlug'

interface IframePropsRouter {
  solution: string
  subpath: string
}

const Iframe: React.FC = () => {
  postMessage()

  const dispatch = useDispatch()

  const { colors } = useTheme()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { guid } = store.getState().profile
  const { level } = store.getState().educationalStage

  const { solution, subpath } = useParams<IframePropsRouter>()

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

  const date = new Date()

  useEffect(() => {
    if (!frameUrl) {
      getCardInformation()
      return
    }
    async function getCardInformation() {
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
    documentTitle(frameName || 'Hub')
    return setUrl(frameUrl || '')
  }, [dispatch, frameName, frameUrl, guid, level, solution, subpath])

  return (
    <IframeContainer>
      <PulseLoader
        color={colors.blue[500]}
        loading={loading}
        size={30}
        css={`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
        `}
      />
      <iframe
        id="hub-solution-iframe"
        loading="lazy"
        name={String(date.getTime())}
        onLoad={() => setLoading(false)}
        src={url}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IframeContainer>
  )
}

export default Iframe
