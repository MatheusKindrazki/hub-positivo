import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import documentTitle from '@psdhub/common/utils/documentTitle'

import usePostMessage from '~/hooks/usePostMessage'

import { IframeContainer } from './styles'
import getCardInformation from './hook/useCardInformation'
import LoadingFrame from './components/Loading'
import DynamicIframe from './components/Iframe'

const Iframe: React.FC = () => {
  usePostMessage()

  const dispatch = useDispatch()

  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

  useEffect(() => {
    documentTitle(frameName || 'Soluções')

    if (frameUrl) {
      setUrl(frameUrl)
    }
  }, [dispatch, frameName, frameUrl])

  if (!frameUrl) {
    getCardInformation()
  }

  return (
    <IframeContainer>
      <LoadingFrame loading={loading} />
      <DynamicIframe
        id="hub-solution-iframe"
        data-testid="hub-solution-iframe"
        loading="lazy"
        onLoad={() => setLoading(false)}
        src={url}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IframeContainer>
  )
}

export default Iframe
