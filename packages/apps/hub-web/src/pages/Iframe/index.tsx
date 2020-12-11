import React, { useMemo } from 'react'

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

  const { solution } = useParams<IframePropsRouter>()

  const { frameUrl } = useSelector((state: Store.State) => state.products)

  const renderUrl = useMemo(() => {
    if (!frameUrl) {
      const getUrl = getFrame(solution)

      if (!getUrl) return history.push('/')

      return getUrl
    }

    setFrame({ key: solution, url: frameUrl })

    return frameUrl
  }, [frameUrl, solution])

  return (
    <IframeContainer>
      <PulseLoader
        color={colors.blue[500]}
        loading
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
        src={renderUrl || ''}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IframeContainer>
  )
}

export default Iframe
