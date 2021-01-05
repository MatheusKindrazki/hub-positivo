import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { useTheme } from '@hub/common/layout/styles'
import documentTitle from '@hub/common/utils/documentTitle'

import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import usePostMessage from '~/hooks/usePostMessage'

import { IframeContainer } from './styles'

interface IframePropsRouter {
  solution: string
}

const Iframe: React.FC = () => {
  usePostMessage()

  const { colors } = useTheme()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { solution } = useParams<IframePropsRouter>()

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

  useEffect(() => {
    documentTitle(frameName || 'Hub')
    setTimeout(() => setLoading(false), 2500)

    return setUrl(frameUrl || '')
  }, [frameName, frameUrl, solution])

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
