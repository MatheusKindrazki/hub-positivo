import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@hub/common/layout/styles'
import createSlug from '@hub/common/utils/createSlug'
import documentTitle from '@hub/common/utils/documentTitle'

import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import usePostMessage from '~/hooks/usePostMessage'
import history from '~/services/history'
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
      const card = await getCardBySlug({ slug: solution })

      if (!card) return history.push('/')

      const product = createSlug(card.nome)
      dispatch(
        preAuth({
          name: card.nome,
          url: card.link || '',
          tipoRenderizacao: card.tipoRenderizacao,
          product: product,
          subpath: subpath !== undefined ? subpath : ''
        })
      )
    }

    documentTitle(frameName || 'Hub')
    setTimeout(() => setLoading(false), 2500)

    return setUrl(frameUrl || '')
  }, [dispatch, frameName, frameUrl, solution, subpath])

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
