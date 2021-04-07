import React from 'react'

import { render } from '@psdhub/test-utils'

import CardAlunos from '~/pages/MyClasses/components/CardAlunos'

describe('CardAlunos should work properly', () => {
  it('Should render username in lowercase', () => {
    const name = 'Firstname Lastname'
    const { queryByText } = render(
      <CardAlunos nome={name} idUsuarioUnico="idUnico" ativo={true} />
    )
    const element = queryByText(name.toLowerCase())
    expect(element).not.toBeNull()
  })
})
