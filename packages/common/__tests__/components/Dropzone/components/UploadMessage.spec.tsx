import React from 'react'

import { render } from '@psdhub/test-utils'

import UploadMessage from '../../../../../common/components/Dropzone/components/UploadMessage'
describe('UploadMessage should work properly', () => {
  it('Should render active && reject text', () => {
    const { queryByText } = render(
      <UploadMessage active reject callback={jest.fn()} />
    )

    expect(
      queryByText('A imagem deve ser em formato SVG.', { exact: false })
    ).toBeInTheDocument()
  })

  it('Should render !active && !preview.url text', () => {
    const { queryByText } = render(
      <UploadMessage active={false} reject callback={jest.fn()} />
    )

    expect(
      queryByText('Arraste e solte uma imagem para usar como ícone ou', {
        exact: false
      })
    ).toBeInTheDocument()

    expect(
      queryByText('busque em seus arquivos', { exact: false })
    ).toBeInTheDocument()
  })

  it('Should render preview.url text', () => {
    const { queryByText } = render(
      <UploadMessage
        active={false}
        reject={false}
        callback={jest.fn()}
        preview={{ url: 'url', name: 'name' }}
      />
    )

    expect(queryByText('Excluir', { exact: false })).toBeInTheDocument()
  })
})
