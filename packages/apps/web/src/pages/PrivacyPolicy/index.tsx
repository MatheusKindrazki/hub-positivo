import React from 'react'

import { Table } from '@psdhub/common/components'

import { Container, Main } from './styles'

// h1 => h2 =>  h3 => h4 => p

const PrivacyPolicy: React.FC = () => {
  return (
    <Container>
      <h1>Page title</h1>

      <Main>
        <h2>Titulo 1</h2>
        <p>
          Consequat excepteur consequat aute do aliquip ea eu. Do nulla sunt
          excepteur consectetur cupidatat excepteur sit sunt eu. Amet voluptate
          do minim eiusmod. Do minim culpa incididunt anim consequat id
          excepteur eu ad. Voluptate velit adipisicing quis magna sit aliqua
          magna esse sit. Tempor adipisicing aliquip amet deserunt irure sunt
          magna labore ut sunt ullamco.
        </p>
        <h3>Titulo 2</h3>
        <p>
          Consequat excepteur consequat aute do aliquip ea eu. Do nulla sunt
          excepteur consectetur cupidatat excepteur sit sunt eu. Amet voluptate
          do minim eiusmod. Do minim culpa incididunt anim consequat id
          excepteur eu ad. Voluptate velit adipisicing quis magna sit aliqua
          magna esse sit. Tempor adipisicing aliquip amet deserunt irure sunt
          magna labore ut sunt ullamco.
        </p>
        <h4>Titulo 3</h4>
        <p>
          Consequat excepteur consequat aute do aliquip ea eu. Do nulla sunt
          excepteur consectetur cupidatat excepteur sit sunt eu. Amet voluptate
          do minim eiusmod. Do minim culpa incididunt anim consequat id
          excepteur eu ad. Voluptate velit adipisicing quis magna sit aliqua
          magna esse sit. Tempor adipisicing aliquip amet deserunt irure sunt
          magna labore ut sunt ullamco.
        </p>
        <Table
          columns={[
            { property: 'teste', header: 'teste' },
            { property: 'teste2', header: 'teste2' }
          ]}
          data={[
            { teste: 'Conteudo do teste 1', teste2: 'conteudo do teste 2' },
            { teste: 'Conteudo do teste 1', teste2: 'conteudo do teste 2' },
            { teste: 'Conteudo do teste 1', teste2: 'conteudo do teste 2' }
          ]}
        />
      </Main>
    </Container>
  )
}

export default PrivacyPolicy
