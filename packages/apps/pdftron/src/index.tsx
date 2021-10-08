import React, { useRef, useEffect } from 'react'

import WebViewer from '@pdftron/webviewer'

import { Container } from './styles'

const App: React.FC = () => {
  const viewer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    WebViewer(
      {
        path: '/lib',

        initialDoc:
          'https://stlivromusicaprod001.blob.core.windows.net/audios/CTPM_Mergulhando_em_poesia.pdf',
        disableLogs: true,
        // isReadOnly: true,
        licenseKey:
          'Studos Software Ltda(studos.com.br):OEM:Studos::B+:AMS(20220809):C1DC662C07FAFAF38B313BC9B243182F4E6F3FD7763A639BB57BB43C404EB604F431F5C7',
        streaming: true
      },
      viewer.current as HTMLElement
    ).then(instance => {
      instance.UI.disableElements([
        'printButton',
        'downloadButton',
        'themeChangeButton',
        'thumbDelete',
        'pageManipulationOverlayButton',
        'toolbarGroup-View',
        'toggleNotesButton',
        'thumbMultiDelete',
        'thumbExtract',
        'selectToolButton'
      ])

      instance.UI.setLanguage('pt_BR')
    })
  }, [])

  return <Container className="webviewer" ref={viewer}></Container>
}

export default App
