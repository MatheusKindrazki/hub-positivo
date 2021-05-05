import React, { memo, useEffect } from 'react'

import Script from 'react-load-script'
import Helmet from 'react-helmet'
import { generate } from 'randomstring'

interface ModulesProps {
  type: string
  url: string
  hash: string
  handleLoad: () => void
}

const LoadModules: React.FC<ModulesProps> = ({
  type,
  url,
  hash,
  handleLoad
}) => {
  const identifyScript = generate(15)

  useEffect(() => {
    const element = document.getElementById(`micro-frontend-${identifyScript}`)

    return () => {
      setTimeout(() => {
        element?.remove()
      }, 500)
    }
  }, [identifyScript])

  if (type === 'css') {
    return (
      <Helmet>
        <link rel="stylesheet" href={`${url}?hash=${hash}`} />
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
      url={`${url}?hash=${hash}`}
    />
  )
}

export default memo(LoadModules)
