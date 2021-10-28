import React, { useEffect, useRef } from 'react'

import WebViewerTron from '@pdftron/webviewer'

import { Container } from './styles'

interface WebViewerProps {
  url: string
}

const Webviewer: React.FC<WebViewerProps> = ({ url }) => {
  const viewer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    WebViewerTron(
      {
        path: '/lib',
        initialDoc: url,
        disableLogs: true,
        isReadOnly: true,
        licenseKey:
          'Studos Software Ltda(studos.com.br):OEM:Studos::B+:AMS(20220809):C1DC662C07FAFAF38B313BC9B243182F4E6F3FD7763A639BB57BB43C404EB604F431F5C7',
        streaming: false
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

export default Webviewer
