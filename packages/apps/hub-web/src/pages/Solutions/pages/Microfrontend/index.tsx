import React, { useEffect, useState, useMemo, useCallback } from 'react'

import { generate } from 'randomstring'

import { postInformations } from '@psdhub/helpers'
import { Box } from '@psdhub/common/components'

import { ReturnScripts } from '~/orchestrator'

import LoadModules from '../../components/LoadModules'
interface MicrofrontendProps {
  data: any // deverá ser any, pois a tipagem virá do componente filho
  onLoaded(): void
}

postInformations('@MCF: Dado vindo do hub!' as any)

const MicrofrontendSolution: React.FC<MicrofrontendProps> = ({
  onLoaded,
  data
}) => {
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

  const hashRender = useMemo(() => {
    return generate(15)
  }, [])

  return (
    <>
      <Box id={mcf?.element_id} />
      {mcf?.scripts?.map((s, i) => (
        <LoadModules
          handleLoad={handleNumberOfScriptsLoaded}
          hash={hashRender}
          key={i}
          {...s}
        />
      ))}
    </>
  )
}

export default MicrofrontendSolution
