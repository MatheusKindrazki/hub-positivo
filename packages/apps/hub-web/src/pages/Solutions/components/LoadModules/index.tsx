import React, { memo, useEffect } from 'react'

import Script from 'react-load-script'
import Helmet from 'react-helmet'
import { generate } from 'randomstring'

interface ModulesProps {
  type: string
  url: string
  handleLoad: () => void
}

const LoadModules: React.FC<ModulesProps> = ({ type, url, handleLoad }) => {
  const identifyScript = generate(15)

  useEffect(() => {
    const element = document.getElementById(`micro-frontend-${identifyScript}`)

    return () => {
      element?.remove()
    }
  }, [identifyScript])

  if (type === 'css') {
    return (
      <Helmet>
        <link rel="stylesheet" href={url} />
      </Helmet>
    )
  }

  return (
    <Script
      attributes={{
        id: `micro-frontend-${identifyScript}`,
        crossOrigin: ''
      }}
      onLoad={handleLoad}
      url={url}
    />
  )
}

export default memo(LoadModules)
