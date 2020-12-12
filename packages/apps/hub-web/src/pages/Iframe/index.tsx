import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { useTheme } from '@hub/common/layout/styles'

import { useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

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

  const { frameUrl } = useSelector((state: Store.State) => state.products)

  useEffect(() => {
    if (!frameUrl) {
      const getUrl = getFrame(solution)

      if (!getUrl) return history.push('/')

      setUrl(getUrl)

      setTimeout(() => {
        setLoading(false)
      }, 2500)

      return
    }

    setFrame({ key: solution, url: frameUrl || '' })

    setTimeout(() => {
      setLoading(false)
    }, 2500)

    return setUrl(frameUrl || '')
  }, [frameUrl, solution])

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
