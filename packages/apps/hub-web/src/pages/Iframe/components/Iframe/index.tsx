import React, { createElement, IframeHTMLAttributes, useEffect } from 'react'

type IframeProps = IframeHTMLAttributes<HTMLIFrameElement>

const Iframe: React.FC<IframeProps> = props => {
  useEffect(() => {
    console.log('reconstruindo iframe com a url:', props.src)
  }, [props.src])

  return createElement('iframe', props)
}

export default Iframe
