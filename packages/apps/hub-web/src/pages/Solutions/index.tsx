/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { createEvent, dispatchEvent } from '~/orchestrator/createEvent'
import { loadScripts, ReturnScripts } from '~/orchestrator'

import LoadModules from './components/LoadModules'

const Solutions: React.FC = () => {
  const event = createEvent({
    userName: 'Matheus Kindrazki Saldanha'
  })

  const [mcf, setMcf] = useState({} as ReturnScripts)

  useEffect(() => {
    async function getMCF() {
      const resMcf = await loadScripts({
        manifest: 'https://run.mocky.io/v3/a96f4f1e-2bee-4082-b543-6bd493d83571'
      })

      setMcf({
        scripts: resMcf.scripts,
        element_id: resMcf.element_id
      })
    }

    dispatchEvent(event)

    getMCF()
  }, [])

  return (
    <>
      <div id={mcf.element_id}></div>
      {mcf?.scripts?.map((s, i) => (
        <LoadModules key={i} {...s} />
      ))}
    </>
  )
}

export default Solutions
