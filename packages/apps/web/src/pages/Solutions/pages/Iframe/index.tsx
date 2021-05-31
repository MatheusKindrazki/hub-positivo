import React from 'react'

import usePostMessage from '~/hooks/usePostMessage'

import DynamicIframe from '../../components/Iframe'

interface IframeProps {
  data: any // deverá ser any, pois a tipagem virá do componente filho
  onLoaded(): void
}

const Iframe: React.FC<IframeProps> = ({ data, onLoaded }) => {
  usePostMessage()

  return (
    <DynamicIframe
      id="hub-solution-iframe"
      data-testid="hub-solution-iframe"
      loading="lazy"
      onLoad={onLoaded}
      src={data}
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

export default Iframe
