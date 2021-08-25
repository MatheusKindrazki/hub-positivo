import React, { useEffect, useState, useMemo, memo, useCallback } from 'react'

import { generate } from 'randomstring'

import { store } from '~/store'

import { useTheme } from '@psdhub/common/layout/styles'
import { Box } from '@psdhub/common/components'

import { ReturnScripts } from '~/orchestrator'

import { startApp, stopApp } from './utils/startStop'
import useRefreshToken from './hooks/useRefreshToken'
import communicatorMCF, { clearData } from './communicator'
import LoadModules from '../../components/LoadModules'
interface MicrofrontendProps {
  data: any // deverá ser any, pois a tipagem virá do componente filho
  onLoaded(): void
}

const MicrofrontendSolution: React.FC<MicrofrontendProps> = ({
  onLoaded,
  data
}) => {
  const { colors } = useTheme()

  useRefreshToken(startApp)

  communicatorMCF(store.getState(), colors)

  const [scriptsLength, setScriptsLength] = useState(0)

  const mcf = useMemo(() => {
    return data as ReturnScripts
  }, [data])

  useEffect(() => {
    return () => {
      stopApp()
      clearData()
    }
  }, [])

  useEffect(() => {
    const quantityScripts = mcf?.scripts?.filter(i => i.type !== 'css')

    if (window.loadedMicroFrontend) return

    if (quantityScripts?.length !== scriptsLength) return

    startApp()

    onLoaded()
  }, [mcf, onLoaded, scriptsLength])

  const handleNumberOfScriptsLoaded = useCallback(() => {
    setScriptsLength(e => {
      return e + 1
    })
  }, [])

  const hashRender = useMemo(() => {
    return generate(20)
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

export default memo(MicrofrontendSolution)
