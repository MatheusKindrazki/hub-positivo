import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import documentTitle from '@hub/common/utils/documentTitle'

import postMessage from '~/middlewares/postMessage'

import { IframeContainer } from './styles'
import getCardInformation from './hook/useCardInformation'
import LoadingFrame from './components/Loading'
import DynamicIframe from './components/Iframe'

const Iframe: React.FC = () => {
  postMessage()

  const dispatch = useDispatch()

  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const { frameUrl, frameName } = useSelector(
    (state: Store.State) => state.products
  )

  useEffect(() => {
    if (!frameUrl) {
      getCardInformation()
      return
    }

    documentTitle(frameName || 'Hub')
    return setUrl(frameUrl || '')
  }, [dispatch, frameName, frameUrl])

  return (
    <IframeContainer>
      <LoadingFrame loading={loading} />
      <DynamicIframe
        id="hub-solution-iframe"
        loading="lazy"
        onLoad={() => setLoading(false)}
        src={url}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IframeContainer>
  )
}

export default Iframe
