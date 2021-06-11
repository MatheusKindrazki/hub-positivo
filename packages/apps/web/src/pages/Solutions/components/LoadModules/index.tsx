import React, { memo, useEffect, useMemo } from 'react'

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
  const moduleId = useMemo(() => {
    return `hub-mcf-${generate(20)}`
  }, [])

  useEffect(() => {
    const module = document.getElementById(moduleId)
    return () => {
      module?.remove()
    }
  }, [moduleId])

  if (type === 'css') {
    return (
      <Helmet>
        <link id={moduleId} rel="stylesheet" href={`${url}?hash=${hash}`} />
      </Helmet>
    )
  }

  return (
    <Script
      attributes={{ id: moduleId }}
      onLoad={handleLoad}
      url={`${url}?hash=${hash}`}
    />
  )
}

export default memo(LoadModules)
