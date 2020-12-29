import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { useTheme } from '@hub/common/layout/styles'
import documentTitle from '@hub/common/utils/documentTitle'

import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import usePostMessage from '~/hooks/usePostMessage'
import history from '~/services/history'
import { getFrame, setFrame } from '~/services/sessionStorage'

import { IframeContainer } from './styles'

interface IframePropsRouter {
  solution: string
}

const Iframe: React.FC = () => {
  const { colors } = useTheme()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { solution } = useParams<IframePropsRouter>()

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

  usePostMessage()

  useEffect(() => {
    if (!frameUrl) {
      const getUrl = getFrame(solution)

      if (!getUrl) return history.push('/')

      documentTitle(getUrl.name)

      setUrl(getUrl.url)

      setTimeout(() => {
        setLoading(false)
      }, 2500)

      return
    }

    setFrame({ key: solution, url: frameUrl || '', name: frameName || 'Hub' })

    documentTitle(frameName || 'Hub')
    setTimeout(() => {
      setLoading(false)
    }, 2500)

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
