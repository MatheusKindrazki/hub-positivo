import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@hub/common/layout/styles'
import createSlug from '@hub/common/utils/createSlug'
import documentTitle from '@hub/common/utils/documentTitle'

import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import usePostMessage from '~/hooks/usePostMessage'
import history from '~/services/history'
import { store } from '~/store'
import { preAuth } from '~/store/modules/authProduct/actions'

import { getCardBySlug } from './services/getCardBySlug'
import { IframeContainer } from './styles'

interface IframePropsRouter {
  solution: string
  subpath: string
}

const Iframe: React.FC = () => {
  const dispatch = useDispatch()
  usePostMessage()

  const { colors } = useTheme()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { guid } = store.getState().profile
  const { level } = store.getState().levelEducation

  const { solution, subpath } = useParams<IframePropsRouter>()

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

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
    setTimeout(() => setLoading(false), 3000)
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
        loading="lazy"
        src={url}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IframeContainer>
  )
}

export default Iframe
