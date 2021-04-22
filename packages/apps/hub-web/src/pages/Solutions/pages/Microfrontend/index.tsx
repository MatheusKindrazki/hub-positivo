import React, { useEffect, useState, memo, useMemo, useCallback } from 'react'

import { generate } from 'randomstring'

import { postInformations } from '@psdhub/helpers'
import { Box } from '@psdhub/common/components'

import { ReturnScripts } from '~/orchestrator'

import LoadModules from '../../components/LoadModules'

interface MicrofrontendProps {
  data: any // deverá ser any, pois a tipagem virá do componente filho
  onLoaded(): void
}

const MicrofrontendSolution: React.FC<MicrofrontendProps> = ({
  onLoaded,
  data
}) => {
  postInformations('Dado vindo do hub 123' as any)

  const [scriptsLength, setScriptsLength] = useState(0)

  const mcf = useMemo(() => {
    return data as ReturnScripts
  }, [data])

  useEffect(() => {
    const quantityScripts = mcf?.scripts?.map(i => i.type !== 'css')

    if (quantityScripts?.length === scriptsLength) {
      window.loadMicrofrontend && window.loadMicrofrontend()

      onLoaded()
    }

    return () => {
      window.unLoadMicrofrontend && window?.unLoadMicrofrontend()
    }
  }, [mcf, onLoaded, scriptsLength])

  const handleNumberOfScriptsLoaded = useCallback(() => {
    setScriptsLength(e => {
      return e + 1
    })
  }, [])

  const hashUrl = useMemo(() => {
    return generate(10)
  }, [])

  return (
    <>
      <Box mt={['41px', '73px']} id={mcf?.element_id} />
      {mcf?.scripts?.map((s, i) => (
        <LoadModules
          handleLoad={handleNumberOfScriptsLoaded}
          hash={hashUrl}
          key={i}
          {...s}
        />
      ))}
    </>
  )
}

export default memo(MicrofrontendSolution)
