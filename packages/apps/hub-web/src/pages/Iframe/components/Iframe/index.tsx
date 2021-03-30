import React, { createElement, IframeHTMLAttributes } from 'react'

type IframeProps = IframeHTMLAttributes<HTMLIFrameElement>

const Iframe: React.FC<IframeProps> = props => {
  return createElement('iframe', props)
}

export default Iframe
