import React, { memo } from 'react'

import Script from 'react-load-script'
import Helmet from 'react-helmet'

interface ModulesProps {
  type: string
  url: string
  hash: string
}

const LoadModules: React.FC<ModulesProps> = ({ type, url, hash }) => {
  if (type === 'css') {
    return (
      <Helmet>
        <link rel="stylesheet" href={`${url}?hash=${hash}`} />
      </Helmet>
    )
  }

  return <Script url={`${url}?hash=${hash}`} />
}

export default memo(LoadModules)
