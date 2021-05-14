import React, { memo, useRef, useEffect } from 'react'

import Script from 'react-load-script'
import Helmet from 'react-helmet'
interface ModulesProps {
  type: string
  url: string
  handleLoad: () => void
}

const LoadModules: React.FC<ModulesProps> = ({ type, url, handleLoad }) => {
  const moduleRef = useRef<HTMLScriptElement>(null)

  useEffect(() => {
    return () => {
      moduleRef.current?.remove()
    }
  }, [])

  if (type === 'css') {
    return (
      <Helmet>
        <link rel="stylesheet" href={url} />
      </Helmet>
    )
  }

  return <Script ref={moduleRef} onLoad={handleLoad} url={url} />
}

export default memo(LoadModules)
