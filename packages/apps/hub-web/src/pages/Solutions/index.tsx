import React, { useEffect, useState } from 'react'

import { loadScripts, ReturnScripts } from '~/orchestrator'
const Solutions: React.FC = () => {
  const [mcf, setMcf] = useState({} as ReturnScripts)

  useEffect(() => {
    async function getMCF() {
      const resMcf = await loadScripts({
        manifest: 'http://127.0.0.1:5500/hub-manifest.json'
      })

      setMcf({
        scripts: resMcf.scripts,
        element_id: resMcf.element_id
      })
    }

    getMCF()
  }, [])

  return <div id={mcf.element_id}></div>
}

export default Solutions
