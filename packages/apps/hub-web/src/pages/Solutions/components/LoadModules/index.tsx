import React from 'react'

import Script from 'react-load-script'
import Helmet from 'react-helmet'

interface ModulesProps {
  type: string
  url: string
}

const LoadModules: React.FC<ModulesProps> = ({ type, url }) => {
  if (type === 'css') {
    return (
      <Helmet>
        <link rel="stylesheet" href={url} />
      </Helmet>
    )
  }

  return <Script url={url} />
}

export default LoadModules
